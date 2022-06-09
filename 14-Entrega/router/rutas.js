
const { Router } = require('express');
const { productosGet, productoPut, productoPost, productoDelete, productoPatch, productosGetid } = require('../controllers/produtos');
const { usuariosGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch} = require('../controllers/usuarios');
const { carritoGet, carritoDelete , carritoGetProductos, carritoPost, carritoDeleteProducto} = require('../controllers/carrito')

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
router.get('/', carritoGet)
router.get('/:id/productos', carritoGetProductos)
router.post('/:id/productos', carritoPost)
router.delete('/:id', carritoDelete)
router.delete('/:id/productos/:id_prod',carritoDeleteProducto)



//producto
router.get('/', productosGet) //punto 1
router.get('/:id', productosGetid)
router.put('/:id',rolPermisos, productoPut)
router.post('/',rolPermisos, productoPost)
router.delete('/:id',rolPermisos, productoDelete)
router.patch('/', productoPatch)

module.exports = router;