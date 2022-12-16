import ProductManager from "../utils/ProductManager.js";

const productManager = new ProductManager("products.txt");



export const productGet = async(req, res ) => {
    try {
        const products = await productManager.getAll();
        res.send(products);
    } catch (error) {
        res.send(error);
    }
}

export const productID = async(req, res ) => {
    const id = req.params.id;
    try {
        const product = await productManager.getById(Number(id));
        res.send(product);
    } catch (error) {
       res.status(400).send(
              `El producto con el id ${id} no existe`
       )
    }
}                                                                       

export const productPost = async(req, res ) => {
    const product = req.body;
    try {
        const newProduct = await productManager.save(product);
        res.status(201).send(`Producto agregado con el id ${newProduct}`);
    } catch (error) {
        res.status(400).send(
            `Error al agregar el producto`
     )
    }
}

export const productPut = async(req, res ) => {
    const product = req.body;
    try {
        const newProduct = await productManager.updateById(product);
        console.log("esto es newProduct  ",newProduct, typeof(newProduct))
        res.status(201).send(`Producto actualizado con el id ${newProduct.id}`);
    } catch (error) {
        res.status(400).send(
            `Error al actualizar el producto`
     )
    }
}
 

export const productDelete = async(req, res ) => {
    const id = req.params.id;
    try {
        await productManager.deleteById(Number(id));
        res.status(201).send(`Producto eliminado con el id ${id}`);
    } catch (error) {
       res.status(400).send(
              `El producto con el id ${id} no existe`
       )
    }
}


