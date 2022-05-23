const { response } = require('express')

const Contenedor = require('../AugustoMosettigFS')
const productos = new Contenedor("productos.txt")




const holaPug = (req, res = response)=> {
    
        res.render('hola', {mensaje: 'este es un mensaje de bienvenida Gatoooooo'})
    
    ejecutar();
}

const  datosPug = (req, res = response) => {

    const {min, nivel, max, titulo} = req.query

    res.render('datos', {min, nivel, max, titulo});
}


module.exports = {
    holaPug,
    datosPug
}