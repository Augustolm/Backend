const { response } = require('express')
const multer  = require('multer')



const Contenedor = require('../AugustoMosettigFS')
const productos = new Contenedor("productos.txt")



// const storage = multer.diskStorage({
//     destination: './uploads',
    
//     filename: (req, file, cb) => {
//         const fileName = file.fieldname + '-' + Date.now()
//         cb(null, fileName)
//     }    
// })

// let upload = multer({ storage: storage });
// uploader = upload.single('uploaded_file')



const productoPost = (req, res)=> {
    const ejecutar = async () => {
        //const guardado = req.body
        const obj = req.body
        const data = await productos.save(obj)

       res.json(`se crea con exito el producto con el id = ${data}`)
        console.log(data);
    }
   ejecutar();

// Ejemplo:
// {
//     "id": 0,
//     "titulo": "Producto133",
//     "url": "pendiente",
//     "precio": 3000
// }


}

const productosGet = (req, res = response)=> {
    const ejecutar = async () => {
    const data = await productos.getAll()
        res.send(data)
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



const productoPut = (req, res)=> {
    const ejecutar = async () => {
        const {id} = req.params
        let {titulo, url, precio} = req.body
        let data = await productos.getById(id)
        let nuevoObj = {
            id: data.id,
            titulo: titulo,
            url: url,
            precio: precio
        }
                
        
       res.send(`se realizaron los siguientes cambios ${JSON.stringify(nuevoObj)}`)
       console.log(nuevoObj)
    
    }      
   ejecutar();
}

const productoDelete = (req, res)=> {
    const ejecutar = async () => {
        const {id} = req.params
        const data = await productos.deleteById(id)
        
       
        if(data) res.status(404).send("Esto no deberia pasar!");
        else  res.send("El Id ya no se encuentra disponible borrado existoso")
    
    }      
   ejecutar();
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