import { Router } from 'express';





import {fileURLToPath} from 'url';
import __dirname from '../server.js';
import ProductManager from '../daos/mongodb/ProductManager.class.js';



const routerProduct = Router();
const productos = new ProductManager()

routerProduct.get('/', async (req, res) => {
const data = await productos.getProducts();

const processedData = data.map(item => ({ ...item._doc }));
  res.render(__dirname + '/views/index', {
    informacionProducto: processedData,
    existe: data ? data.length > 0 : false
  });
});

routerProduct.get('/realtimeproducts', async (req, res) => {  
    res.render(__dirname + '/views/realTimeProducts', {});
  });



export default routerProduct;
