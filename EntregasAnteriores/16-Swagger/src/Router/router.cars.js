import { Router } from "express";
import __dirname from "../app.js";
import { userModel } from "../daos/model/user.model.js";
import CartController from "../controllers/cart.controller.js";
import ProductController from "../controllers/product.controller.js";
import userController from "../controllers/user.controller.js";
import { authClient } from "../utils/authClient.rol.js";
import UserDTO from "../model/userDTO.js";
import TicketController from "../controllers/ticket.controller.js";
import path from "path";

const routerCars = Router();

let usersController = new userController();
let cartController = new CartController();
let productController = new ProductController();
let ticketController = new TicketController();

routerCars.get("/carrito", async (req, res) => {
  try {
    const resultUser = await usersController.getUserByIdController(
      req.session?.passport?.user
    );

    if (!resultUser) {
      return res.render(__dirname + "/views/carrito", {
        productos: [],
      });
    }

    const userDTO = new UserDTO(resultUser);

    const cart = await cartController.getCartByIdController(resultUser.cart);
    console.log("cart", cart);
    if (cart.products && cart.products.length > 0) {
      const productIds = cart.products?.map((item) => item.product);

      const products = await Promise.all(
        productIds?.map((productId) =>
          productController.getProductByIdController(productId)
        )
      );

      const productosSinPrototipo = products.map((product) =>
        product.toObject()
      );

      const totalAPagar = productosSinPrototipo.reduce(
        (total, product) => total + product.price,
        0
      );

      res.render(__dirname + "/views/carrito", {
        productos: productosSinPrototipo,
        user: userDTO,
        totalAPagar: totalAPagar,
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

routerCars.post("/cartps/:cid/purchase", authClient, async (req, res) => {
  const { cid } = req.params;

  const resultUser = await usersController.getUserByIdController(
    req.session.passport.user
  );

  const cart = await cartController.getCartByIdController(resultUser.cart);
  const productIds = cart.products.map((item) => item.product);

  const products = await Promise.all(
    productIds.map((productId) =>
      productController.getProductByIdController(productId)
    )
  );

  const totalAPagar = products.reduce(
    (total, product) => total + product.price,
    0
  );

  const carritoUser = await cartController.getCartByIdController(
    resultUser.cart
  );

  try {
    const ticket = await ticketController.createTicketController({
      code: cid,
      purchaser: resultUser.email,
      amount: totalAPagar,
      products: carritoUser.products,
    });

    let productsToDelete = [];
    if (ticket.productosSinStock && ticket.productosSinStock.length > 0) {
      productsToDelete = ticket.productosSinStock;
    }
    await cartController.deleteAllProductsFromCartController(
      resultUser.cart,
      productsToDelete
    );

    res.status(200).send("Compra realizada exitosamente");
  } catch (error) {
    console.log("Error al realizar la compra", error);
    res.status(500).send("Ocurrió un error al realizar la compra");
  }
});

routerCars.get("/carrito/ticket", async (req, res) => {
  try {
    const ticketCode = req.query.code;

    const ticket = await ticketController.getTicketByIdController(
      ticketCode.toString()
    );

    const cleanTicket = {
      code: ticket.code,
      purchase_datetime: ticket.purchase_datetime,
      amount: ticket.amount,
      purchaser: ticket.purchaser,
      products: ticket.products,
    };

    if (!ticket) {
      console.log("Ticket no encontrado");
      return res.status(404).send("Ticket no encontrado");
    }

    console.log("proximo paso renderizar!", cleanTicket);
    console.log("__dirname", __dirname);
    const viewPath = path.join(__dirname, "views", "ticketcompra.handlebars");
    res.render(viewPath, { ticket: cleanTicket });
  } catch (error) {
    console.log("Error al obtener el ticket", error);
    res.status(500).send("Ocurrió un error al obtener el ticket");
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
  const productId = req.query.productId;
  try {
    let { cart } = await usersController.getUserByIdController(
      req.session.passport.user
    );

    const productId = req.query.productId;

    await cartController.deleteProductFromCartController(cart, productId);

    res.sendStatus(200);
  } catch (error) {
    console.log("Error al eliminar producto del carrito", error);
    res.status(500).send("Ocurrió un error al eliminar producto del carrito");
  }
});

export default routerCars;
