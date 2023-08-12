import { Router } from "express";
import __dirname from "../app.js";
import { userModel } from "../daos/model/user.model.js";
import CartController from "../controllers/cart.controller.js";
import ProductController from "../controllers/product.controller.js";

const routerCars = Router();

let cartController = new CartController();
let productController = new ProductController();

routerCars.get("/carrito", async (req, res) => {
  console.log("req.session", req.session);
  try {
    let cartId = req.session.cartId;
    let cart;

    if (!cartId) {
      const newCart = await cartController.createCartController();
      cartId = newCart._id;
      req.session.cartId = cartId;
      cart = newCart;
    } else {
      cart = await cartController.getCartByIdController(cartId);
    }

    const productIds = cart.products.map((item) => item.product);

    const products = await Promise.all(
      productIds.map((productId) =>
        productController.getProductByIdController(productId)
      )
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
      newCart = await cartController.createCartController();
    } else {
      newCart = await cartController.getCartByIdController(user.cart);
    }

    await cartController.addProductToCartController(newCart, productId);

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

    await cartController.deleteCardController(cartId, productId);

    res.sendStatus(200);
  } catch (error) {
    console.log("Error al eliminar producto del carrito", error);
    res.status(500).send("Ocurrió un error al eliminar producto del carrito");
  }
});

export default routerCars;
