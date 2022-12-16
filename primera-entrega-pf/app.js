import express from 'express';
import routerProduct from './src/Router/productos.js';
import routerCarts from './src/Router/carts.js';



const app = express();
const PORT = 8080;


app.use(express.static('/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//const Contenedor = require('./modelFS');


//const productos = new Contenedor('./productos.txt')


app.use('/api/product', routerProduct);
app.use('/api/carts', routerCarts);  





app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`);
});



