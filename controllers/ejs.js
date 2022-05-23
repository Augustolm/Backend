const { response } = require('express')

const Contenedor = require('../AugustoMosettigFS')
const productos = new Contenedor("productos.txt")




const holaejs = (req, res = response)=> {
    
        res.render('views/datos', {mensaje: 'este es un mensaje de bienvenida Gatoooooo'})
    

}

const  datosEjs = (req, res = response) => {

    const {min, nivel, max, titulo} = req.query

    res.render('views/datos', {min, nivel, max, titulo});
}


const formularioEjs = (req, res= response) => {
    const ejecutar = async () => {
        const data = await productos.getAll()
            
            console.log(data);
            res.render('views/formulario', { data })
        }
        ejecutar();
    
}

const listaEjs = (req, res= response) => {
    const ejecutar = async () => {
        const data = await productos.getAll()
            
            console.log(data);
            res.render('views/lista', { data })
        }
        ejecutar();
    
}

const personasEjs = (req, res= response) => {
   
  
       let obj = {};
           
       obj.titulo = req.body.titulo;
       obj.precio = req.body.precio;
       obj.url = req.body.imagen;
       let id = productos.save(obj);
   
      
       //personas.push({titulo, precio, url})
       res.redirect('/api/ejs/formulario')

 
}



module.exports = {
    holaejs,
    datosEjs,
    formularioEjs,
    personasEjs,
    listaEjs
    
   
}