import { Router } from "express";
import __dirname from "../app.js";
import { userModel } from "../daos/model/user.model.js";
import CartController from "../controllers/cart.controller.js";
import ProductController from "../controllers/product.controller.js";
import userController from "../controllers/user.controller.js";
import { authClient } from "../utils/authClient.rol.js";

const routerCars = Router();

let usersController = new userController();
let cartController = new CartController();
let productController = new ProductController();

routerCars.get("/carrito", async (req, res) => {
  try {
    const resultUser = await usersController.getUserByIdController(
      req.session.passport.user
    );

    if (resultUser.cart) {
      const cart = await cartController.getCartByIdController(resultUser.cart);
      const productIds = cart.products.map((item) => item.product);

      const products = await Promise.all(
        productIds.map((productId) =>
          productController.getProductByIdController(productId)
        )
      );

      const productosSinPrototipo = products.map((product) =>
        product.toObject()
      );

      console.log("productosSinPrototipo", productosSinPrototipo);

      res.render(__dirname + "/views/carrito", {
        productos: productosSinPrototipo,
      });
    } else
      res.render(__dirname + "/views/carrito", {
        productos: [],
      });
  } catch (error) {
    console.log("Error al obtener o crear el carrito", error);
    res.status(500).send("Ocurrió un error al obtener o crear el carrito");
  }
});

routerCars.post("/carrito/productos", authClient, async (req, res) => {
  const productId = req.query.productId;

  const user = await userModel.findById(req.session.passport.user);

  try {
    await cartController.addProductToCartController(user.cart, productId);

    res.status(200).send("Producto agregado al carrito exitosamente");
  } catch (error) {
    console.log("Error al agregar producto al carrito", error);
    res.status(500).send("Ocurrió un error al agregar producto al carrito");
  }
});

routerCars.delete("/carrito/productos", async (req, res) => {
  console.log("req.session", req.session);
  try {
    let { cart } = await usersController.getUserByIdController(
      req.session.passport.user
    );

    const productId = req.query.productId;
    //!ELiminar solo el producto! el carrito ya no es necesario eliminar

    //await cartController.deleteCardController(cart, productId);

    res.sendStatus(200);
  } catch (error) {
    console.log("Error al eliminar producto del carrito", error);
    res.status(500).send("Ocurrió un error al eliminar producto del carrito");
  }
});

export default routerCars;
