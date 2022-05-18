
const { Router } = require('express');
const { productosGet, productoPut, productoPost, productoDelete, productoPatch, productosGetid } = require('../controllers/produtos');
const { usuariosGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch} = require('../controllers/usuarios');





const router = Router();


// router.get('/', usuariosGet) 
// router.put('/:id', usuarioPut) 
// router.post('/', usuarioPost) 
// router.delete('/', usuarioDelete) 
// router.patch('/', usuarioPatch) 


router.get('/', productosGet) //punto 1
router.get('/:id', productosGetid)
router.put('/:id', productoPut)
router.post('/', productoPost)
router.delete('/:id', productoDelete)
router.patch('/', productoPatch)


module.exports = router;