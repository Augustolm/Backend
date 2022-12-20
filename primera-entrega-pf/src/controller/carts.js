import CartManager from "../utils/cartsManager.js";

const cartManager = new CartManager("carts.txt");

export const cartsGetid = async (req, res) => {
    try {
        const cartId = req.params.cid
        const selCart = await cartManager.getCartById(cartId)
        res.send({selCart})
    } catch (error) {
        console.log(error)
    }
}


export const newCarts = async (req, res) => {
    try {
        const newCart = await cartManager.addCart()
        res.send({newCart})
    } catch (error) {
        console.log(error)
    }

}

export const getCarts = async (req, res) => {
    try {
        const carts = await cartManager.getCarts()
        res.send({carts})
    } catch (error) {
       console.log(error)
    }
}


export const cartsPost = async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = parseInt(req.params.pid)
        await cartManager.addProductById(cartId,productId,1)
        const selCart = await cartManager.getCartById(cartId)
        res.send({selCart})
    } catch (error) {
        console.log(error)
    }
}


