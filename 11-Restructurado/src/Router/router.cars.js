import { Router } from "express";
import ProductManager from "../daos/ProductManagerDAO.js";
import CartManager from "../daos/CartManagerDAO.js";
import __dirname from "../app.js";
import { userModel } from "../daos/model/user.model.js";

const routerCars = Router();

const cartManager = new CartManager();
const productManager = new ProductManager();

routerCars.get("/carrito", async (req, res) => {
  console.log("req.session", req.session);
  try {
    let cartId = req.session.cartId;
    let cart;

    if (!cartId) {
      const newCart = await cartManager.createCart();
      cartId = newCart._id;
      req.session.cartId = cartId;
      cart = newCart;
    } else {
      cart = await cartManager.getCartById(cartId);
    }

    const productIds = cart.products.map((item) => item.product);

    const products = await Promise.all(
      productIds.map((productId) => productManager.getProductById(productId))
    );

    const productosSinPrototipo = products.map((product) => product.toObject());

    res.render(__dirname + "/views/carrito", {
      productos: productosSinPrototipo,
    });
  } catch (error) {
    console.log("Error al obtener o crear el carrito", error);
    // Manejar el error de manera apropiada
    res.status(500).send("Ocurrió un error al obtener o crear el carrito");
  }
});

routerCars.post("/carrito/:id/productos", async (req, res) => {
  const productId = req.query.productId;

  const user = await userModel.findById(req.session.passport.user);

  try {
    let newCart = null;
    if (!user.cart) {
      newCart = await cartManager.createCart();
    } else {
      newCart = await cartManager.getCartById(user.cart);
    }

    await cartManager.addProductToCart(newCart, productId);

    res.status(200).send("Producto agregado al carrito exitosamente");
  } catch (error) {
    console.log("Error al agregar producto al carrito", error);
    res.status(500).send("Ocurrió un error al agregar producto al carrito");
  }
});

routerCars.delete("/carrito/productos", async (req, res) => {
  try {
    let cartId = req.session.cartId;
    const productId = req.query.productId;

    await cartManager.deleteProductCard(cartId, productId);

    res.sendStatus(200);
  } catch (error) {
    console.log("Error al eliminar producto del carrito", error);
    res.status(500).send("Ocurrió un error al eliminar producto del carrito");
  }
});

export default routerCars;
