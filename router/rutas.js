
const express = require("express");
const { Router } = require('express');
const { productosGet, productoPut, productoPost, productoDelete, productoPatch, productosGetid } = require('../controllers/produtos');
const { usuariosGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch} = require('../controllers/usuarios');
const {holaPug, datosPug} = require('../controllers/pug');
const { holaejs, datosEjs, formularioEjs, personasEjs, listaEjs } = require("../controllers/ejs");





const router = Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//usuariosTest
// router.get('/', usuariosGet) 
// router.put('/:id', usuarioPut) 
// router.post('/', usuarioPost) 
// router.delete('/', usuarioDelete) 
// router.patch('/', usuarioPatch) 

//EJS

router.get('/', holaejs)
router.get('/datos', datosEjs)
router.get('/formulario', formularioEjs)
router.post('/personas', personasEjs)
router.get('/lista', listaEjs)

//pug
router.get('/', holaPug)
router.get('/datos', datosPug)

//producto
router.get('/', productosGet) //punto 1
router.get('/:id', productosGetid)
router.put('/:id', productoPut)
router.post('/', productoPost)
router.delete('/:id', productoDelete)
router.patch('/', productoPatch)

module.exports = router;