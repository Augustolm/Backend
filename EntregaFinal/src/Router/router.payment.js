import { Router } from "express";
import PaymentService from "../services/stripe.services.js";
import userController from "../controllers/user.controller.js";
import UserDTO from "../model/userDTO.js";
import TicketController from "../controllers/ticket.controller.js";
import CartController from "../controllers/cart.controller.js";
import ProductController from "../controllers/product.controller.js";
import { v4 as uuidv4 } from "uuid";
import configPayment from "../config/configPayment.js";

const routerPayment = Router();

const paymentService = new PaymentService();
const usersController = new userController();
let ticketController = new TicketController();
let cartController = new CartController();
let productController = new ProductController();

const { BASE_URL } = configPayment;

routerPayment.get("/payment-intens", async (req, res) => {
  const userId = req?.session?.passport?.user;
  const user = await usersController.getUserByIdController(userId);
  const userDTO = new UserDTO(user);
  const carritoUser = await cartController.getCartByIdController(user.cart);
  try {
    const products = await Promise.all(
      carritoUser.products.map((product) =>
        productController.getProductByIdController(product.product)
      )
    );
    req.session.amount = products.reduce(
      (total, product) => total + product.price,
      0
    );
    const session = await paymentService.createSession(
      products,
      userDTO.email,
      `${BASE_URL}/success`,
      `${BASE_URL}/cancel`
    );
    res.send(session);
  } catch (error) {
    res.status(500).send({ error: "Error al crear la sesión de pago" });
  }
});

routerPayment.get("/success", async (req, res) => {
  console.log("ingrese a success", req.session);
  const userId = req?.session?.passport?.user;

  const resultUser = await usersController.getUserByIdController(userId);

  const carritoUser = await cartController.getCartByIdController(
    resultUser.cart
  );
  const cid = uuidv4();
  const ticket = await ticketController.createTicketController({
    code: cid,
    purchaser: resultUser.email,
    amount: req?.session?.amount,
    products: carritoUser.products,
  });

  await cartController.deleteAllProductsFromCartController(resultUser.cart);

  res.redirect(`/api/ticket/${ticket.code}`);
});
routerPayment.get("/cancel", async (req, res) => {});

export default routerPayment;
