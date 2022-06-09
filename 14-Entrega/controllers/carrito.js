const { response } = require('express')

const Carrito = require('../carritoFs')
const carrito1 = new Carrito('./carrito.txt');


const carritoGet = (req, res = response)=> {
    
    const ejecutar = async () => {
   
        let newCarrito = await carrito1.createCarrito();
        res.send(newCarrito);

    }
    ejecutar()
    
}

const carritoDelete = (req, res = response ) => {
    ejecutar = async () => {

        let id = req.params.id;
        await carrito1.deleteCart(id);
        res.send('Carrito eliminado');
    }
    ejecutar();
}



//Obtengo todos los productos dentro del carrito con /carrito/id/productos
// carritoRouter.get('/:id/productos',async (req,res) => {

const carritoGetProductos =(req, res = response )=> {

    ejecutar = async () => {
        
        let id = req.params.id;
        let carrito = await carrito1.getById(parseInt(id));
        res.send(carrito.productos);
    }
    ejecutar();

}


const carritoPost = (req, res=response) => {

    ejecutar = async() => {
        let id = req.params.id;
        let body = req.params.body
        console.log(body);
        let carrito = await carrito1.saveProductInCart(parseInt(id),body);
        res.send(carrito);

    }
}


const carritoDeleteProducto = (req, res= response) => {


    ejecutar = async() => {
        let id = req.params.id;
        let prodId = req.params.id_prod;
        await carrito1.deleteProdInCart(id,prodId);
        res.send('Producto eliminado');

    }
}







module.exports = {
    carritoGet,
    carritoDelete,
    carritoGetProductos,
    carritoPost,
    carritoDeleteProducto
}