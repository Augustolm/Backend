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
    const filters = {};

    


 const options = {
    page,
    limit,
    ...(req.query.select && { select: req.query.select }),

  };

  if (req.query.sort && req.query.sort !== '0') {
    options.sort = { price: req.query.sort }; 
  }

  if(req.query.categoria && req.query.categoria !== '0') {
    filters.category = req.query.categoria;
  }





const categories = await product.getCategories();

  const data = await product.getProducts(filters, options);


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

const updatedOptions = { ...options, page: 1 }; // Establecer la página en 1 para obtener la cantidad total de páginas actualizada
const updatedData = await product.getProducts(filters, updatedOptions);

const totalPages = updatedData.totalPages;


  const context = {
    informacionProducto: formattedData,
    existe: data.docs.length > 0,
    categorias: categories,
    pagination: {
      page: data.page,
      totalPages: data.totalPages,
    }
  };
      

        const range = Array.from({ length: totalPages }, (_, index) => index + 1);
        context.totalPages = range;

  console.log("context", context)
res.render(__dirname + '/views/index', { context });
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
