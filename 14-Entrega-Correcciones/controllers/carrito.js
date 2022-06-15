const { response } = require('express')
const Contenedor = require('../AugustoMosettigFS')
const Carrito = require('../carritoFs')


const carrito1 = new Carrito('./carrito.txt');
const producto1 = new Contenedor('./productos.txt')



const carritoNew = ( req, res =response) => {
    const ejecutar = async () => {
        let newCarrito = await carrito1.createCarrito()
        res.send(newCarrito)
    }
    ejecutar();
}


const carritoGet = (req, res = response)=> {
    
    const ejecutar = async () => {
   
        let id = req.params.id;
        let carrito = await carrito1.getById(parseInt(id));
        res.send(carrito);

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
        console.log(id);
        let productos = req.body.id
       
        console.log(productos);
        // let carrito = await carrito1.saveProductInCart(parseInt(id),body);
        // res.send(carrito);
        console.log('esto es productos',productos.id);
        let findProduct = await producto1.getById(productos);
        console.log(findProduct);
        await carrito1.saveProductInCart(parseInt(id),findProduct)

        res.send('Producto Agregado al Carrito')


    }
    ejecutar();
}




const carritoDeleteProducto = (req, res= response) => {


    ejecutar = async() => {
        let id = req.params.id;
        let prodId = req.params.id_prod;
        await carrito1.deleteProdInCart(id,prodId);
        res.send('Producto eliminado');

    }
    ejecutar();
}







module.exports = {
    carritoGet,
    carritoDelete,
    carritoGetProductos,
    carritoPost,
    carritoDeleteProducto,
    carritoNew
}