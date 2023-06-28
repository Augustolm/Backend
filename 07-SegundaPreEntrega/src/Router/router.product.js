import { Router } from 'express';
import __dirname from '../app.js';
import ProductManager from '../daos/ProductManager.class.js';
import path from 'path';


const routerProduct = Router();


const product = new ProductManager()




routerProduct.get('/', async (req, res) => {

try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

 const options = {
    page,
    limit,
    ...(req.query.select && { select: req.query.select }),
    ...(req.query.populate && { populate: req.query.populate })
  };



  if (req.query.sort && req.query.sort !== '0') {
    options.sort = { price: req.query.sort }; 
}

  const data = await product.getProducts(options);

     const formattedData = data.docs.map((item) => {
        return {
          _id: item._id.toString(),
          title: item.title,
          description: item.description,
          price: item.price,
          status: item.status,
          category: item.category,
          thumbnail: item.thumbnail,
          code: item.code,
          stock: item.stock,
          timestamp: item.timestamp,
        };
      });

res.render(__dirname + '/views/index', {
    informacionProducto: formattedData,
    existe: data.docs.length > 0
    
  });
} catch (error) {
    console.log("error al intentar cargar ", error)
}
});

routerProduct.post('/add', async (req, res) => {
    const body = req.body;
    const result = await product.addProduct(body);
    console.log("result", result)
    res.redirect('/');
});






export default routerProduct;
