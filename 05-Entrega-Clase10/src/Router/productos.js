import { Router } from 'express';
import ProductManager from '../api/ProductManager.js';


const routerProduct = Router();
const productos = new ProductManager("productos.txt");

routerProduct.get('/', async (req, res) => {
const data = await productos.getAll();

  res.render('index', {
    informacionProducto: data,
    existe: data.length > 0
  });
});

routerProduct.get('/realtimeproducts', async (req, res) => {  
    res.render('realTimeProducts', {});
  });



export default routerProduct;
