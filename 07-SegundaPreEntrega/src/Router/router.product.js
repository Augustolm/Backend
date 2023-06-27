import { Router } from 'express';


import __dirname from '../app.js';
import ProductManager from '../daos/ProductManager.class.js';



const routerProduct = Router();


const product = new ProductManager()




routerProduct.get('/', async (req, res) => {

    res.render(__dirname + '/views/index', {});
    const data = await product.getProducts()
    console.log("getProducts", data)

//   res.render(__dirname + '/views/index', {
//     informacionProducto: data,
//     existe: data.length > 0
//   });
});

// routerProduct.get('/realtimeproducts', async (req, res) => {  
//     res.render(__dirname + '/views/realTimeProducts', {});
//   });



export default routerProduct;
