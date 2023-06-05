import { Router } from 'express';
import ProductManager from '../api/ProductManager.js';



import {fileURLToPath} from 'url';
import __dirname from '../server.js';



const routerProduct = Router();
const productos = new ProductManager("productos.txt");

routerProduct.get('/', async (req, res) => {
const data = await productos.getAll();


  res.render(__dirname + '/views/index', {
    informacionProducto: data,
    existe: data.length > 0
  });
});

routerProduct.get('/realtimeproducts', async (req, res) => {  
    res.render(__dirname + '/views/realTimeProducts', {});
  });



export default routerProduct;
