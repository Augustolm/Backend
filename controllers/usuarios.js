const { response } = require('express')






const usuariosGet = (req, res = response)=> {
    
    const {q, nombre = 'sin nombre', apikey, page = 1 , limit = 30} = req.query

    res.json({
        
        msg: "get Api - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}


const usuarioPut = (req, res)=> {

    const { id } = req.params
    
    res.json({
        
        msg: "put Api - Controlador",
        id

    });
}

const usuarioPost = (req, res)=> {
    
    const {nombre, edad} = req.body;

    res.json({        
        msg: "post aPi - Controlador",
        nombre,
        edad

    });
}

const usuarioDelete = (req, res)=> {
    res.json({
       msg: "delete aPi - Controlador"
    });
}

const usuarioPatch = (req, res)=> {
    res.json({
       msg: "patch aPi - Controlador"
    });
}



module.exports = {
    usuariosGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
}