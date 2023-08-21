import { Router } from "express";
import { generatorProductMock } from "../utils/generaterProduct.js";
import ProductController from "../controllers/product.controller.js";

const routerMocks = Router();

const productController = new ProductController();

routerMocks.get("/mockingproducts", async (req, res) => {
  let productsMock = [];

  for (let i = 0; i < 10; i++) {
    productsMock.push(await generatorProductMock());

    await productController.createProductController(productsMock[i]);
  }

  res.send({ status: "ok", productsMock: productsMock });
});

export default routerMocks;
