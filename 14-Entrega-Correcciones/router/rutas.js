
const { Router } = require('express');
const { productosGet, productoPut, productoPost, productoDelete, productoPatch, productosGetid } = require('../controllers/produtos');
const { usuariosGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch} = require('../controllers/usuarios');
const { carritoGet, carritoDelete , carritoGetProductos, carritoPost, carritoDeleteProducto, carritoNew} = require('../controllers/carrito')

async function getUser() {
    return{
        usuario: 'Pepe',
        administrador: true
    }
}

const rolPermisos = async(req, res, next) => {
    const user = await getUser();
    req.locals = {
        user,
    };
    next();
}

const router = Router();

//usuariosTest
// router.get('/', usuariosGet) 
// router.put('/:id', usuarioPut) 
// router.post('/', usuarioPost) 
// router.delete('/', usuarioDelete) 
// router.patch('/', usuarioPatch) 

//carrito
router.get('/carrito/:id', carritoGet)
router.get('/carrito/:id/productos', carritoGetProductos)
router.post('/carrito', carritoNew)
router.post('/carrito/:id/productos', carritoPost)
router.delete('/carrito/:id', carritoDelete)
router.delete('/carrito/:id/productos/:id_prod',carritoDeleteProducto)



//producto
router.get('/productos/', productosGet) //punto 1
router.get('/productos/:id', productosGetid)
router.put('/productos/:id',rolPermisos, productoPut)
router.post('/productos/',rolPermisos, productoPost)
router.delete('/productos/:id',rolPermisos, productoDelete)
router.patch('/productos/', productoPatch)

module.exports = router;