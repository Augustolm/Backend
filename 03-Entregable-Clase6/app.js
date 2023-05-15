import express from 'express';
import path from 'path';
import ProductManager from './productManager.js';

const app = express();

const publicPath = path.join(new URL(import.meta.url).pathname, 'public');

const data = "./data/productos.json";
const producto = new ProductManager(data)

app.get('/', (req, res) => {
    res.send("Hola mundo")
});

/**
 * Endpoint que devuelve la lista completa de productos.
 * También acepta un parámetro opcional 'limit' para limitar la cantidad de productos a devolver.
 * 
 * Cantidad de id disponibles: 1-2
 * Ejemplo de uso: /productos?limit=1
 */
app.get('/productos', async (req, res) => {
    const limit = req.query.limit;
    const productos = await producto.getProducts();

    if (limit) {
        const limitedProductos = productos.slice(0, limit);
        res.json(limitedProductos);
    } else {
        res.json(productos);
    }
});

/**
 * Endpoint que devuelve un producto específico según el ID pasado como parámetro.
 * 
 * Ejemplo de uso: /productos/1
 */
app.get('/productos/:id', async (req, res) => {
    const id = req.params.id;
    const productos = await producto.getProductById(Number(id));
    if (productos) {
        res.json(productos);
    } else {
        res.json({ error: 'producto no encontrado' });
    }
});




app.use(express.static(publicPath));
app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
