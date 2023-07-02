import { Router } from 'express';
import __dirname from '../app.js';
import ProductManager from '../daos/ProductManager.class.js';
import CartManager from '../daos/CartManager.class.js';


const routerCars = Router();


const cartManager = new CartManager()
const productManager = new ProductManager()

routerCars.get('/carrito', async (req, res) => {
   // const idCart = req.params.id;
   const idCart =  "64a19d9c6ab70dcbf8280238"

    try {
      let cart;
  
      if (idCart) {
        cart = await cartManager.getCartById(idCart);
      } 

      const productIds = cart.products.map(item => item.product);

      const products = await Promise.all(productIds.map(productId => productManager.getProductById(productId)));

      const productosSinPrototipo = products.map(product => product.toObject());



      res.render(__dirname + '/views/carrito', { productos: productosSinPrototipo  });
    } catch (error) {
      console.log("Error al obtener o crear el carrito", error);
      // Manejar el error de manera apropiada
      res.status(500).send("Ocurrió un error al obtener o crear el carrito");
    }
  });



  routerCars.post('/carrito/:id/productos', async (req, res) => {
   
    //Logica para encontrar el carrito del usuario { usuario, carrito: [] }
    const idCart =  "64a19d9c6ab70dcbf8280238"    //req.params.id;
    const productId = req.query.productId; // Obtener el ID del producto de la consulta

    try {
       await cartManager.addProductToCart(idCart, productId);

    } catch (error) {
      console.log("Error al agregar producto al carrito", error);
      res.status(500).send("Ocurrió un error al agregar producto al carrito");
    }
  });
  


  routerCars.delete('/carrito/:id/productos', async (req, res) => {
    console.log("pase por aca")
    
    try {
      const idCart = "64a19d9c6ab70dcbf8280238"; // req.params.id;
      const productId = req.query.productId; // Obtener el ID del producto de la consulta
      console.log("producto desde el back", productId);
      
      await cartManager.deleteProductCard(idCart, productId);
  
     res.sendStatus(200);
    } catch (error) {
      console.log("Error al eliminar producto del carrito", error);
      res.status(500).send("Ocurrió un error al eliminar producto del carrito");
    }
  });
  


export default routerCars;
