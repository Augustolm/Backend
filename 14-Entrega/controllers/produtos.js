const { response } = require('express')
const multer  = require('multer')
const Contenedor = require('../AugustoMosettigFS')



const productos = new Contenedor("productos.txt")







const productoPost = (req, res, next)=> {
    const {usuario, administrador} = req.locals.user
    if(administrador) {
    console.log(administrador);
      
    const ejecutar = async () => {

        try {

            //a = req.body
            let obj = {};
        
            obj.titulo = req.body.titulo;
            obj.precio = req.body.precio;
            obj.url = req.body.imagen;
            let id = await productos.save(obj);
        
            res.send({ obj });
      
          } catch (error) {
            throw new Error("Hubo un error al agregar el producto");
          }

        
    }
   ejecutar();
    }
    else{
        next(new Error('Sin permisos'))
    }

}




const productosGet = (req , res = response, next)=> {
    
        const ejecutar = async () => {
            const data = await productos.getAll()
                res.send(data)
                //console.log(data);
            }
            ejecutar();

    }
        




const productosGetid = (req, res = response)=> {
   const ejecutar = async () => {
        const {id} = req.params
        const data = await productos.getById(id)
        
       
        if(!data)res.status(404).send("No existe Id");
        else  res.send(data)
    }      
   ejecutar();
}



const productoPut = (req, res, next)=> {
    const {usuario, administrador} = req.locals.user
    if(administrador) {
    console.log(administrador);
    const ejecutar = async () => {
        try {
            let obj = {};
            obj.id = parseInt(req.params.id);
            obj.titulo = req.body.titulo;
            obj.precio = req.body.precio;
            obj.url = req.body.imagne;
        
            let id = await productos.updateById(obj);
        
            res.send(id);


          } catch (error) {
             throw new Error("Hubo un error al actualizar el producto");
           }
    
    }      
    ejecutar();
    }
    else{
        next(new Error('Sin permisos'))
        
    }
}

const productoDelete = (req, res, next)=> {
    const {usuario, administrador} = req.locals.user
    if(administrador) {
    console.log(administrador);
    const ejecutar = async () => {
        const {id} = req.params
        const data = await productos.deleteById(id)
        
       
        if(data) res.status(404).send("Esto no deberia pasar!");
        else  res.send("El Id ya no se encuentra disponible borrado existoso")
    
    }      
     ejecutar();
    }
    else{
        next(new Error('Sin permisos'))
    
    }
}

const productoPatch = (req, res)=> {
    res.json({
       msg: "patch aPi - Controlador - Sin uso"
    });
}



module.exports = {
    productosGet,
    productoPut,
    productoPost,
    productoDelete,
    productoPatch,
    productosGetid
   
}