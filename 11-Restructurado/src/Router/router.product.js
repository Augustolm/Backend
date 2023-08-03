import { Router } from "express";

import __dirname from "../app.js";
import { auth } from "../utils/auth.rol.js";
import { userModel } from "../daos/model/user.model.js";
import ProductController from "../controllers/product.controller.js";

const routerProduct = Router();

let productController = new ProductController();

routerProduct.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const filters = {};

    const options = {
      page,
      limit,
      ...(req.query.select && { select: req.query.select }),
    };

    if (req.query.sort && req.query.sort !== "0") {
      options.sort = { price: req.query.sort };
    }

    if (req.query.categoria && req.query.categoria !== "0") {
      filters.category = req.query.categoria;
    }

    const categories = await productController.getCategoriesController();
    const data = await productController.getProductsController(
      filters,
      options
    );

    const formattedData = data.docs.map((item) => {
      return {
        _id: item._id.toString(),
        title: item.title,
        description: item.description,
        price: item.price,
        status: item.status,
        category: item.category,
        thumbnail: item.thumbnail,
        code: item.code,
        stock: item.stock,
        timestamp: item.timestamp,
      };
    });

    const updatedOptions = { ...options, page: 1 };
    const updatedData = await productController.getProductsController(
      filters,
      updatedOptions
    );
    const totalPages = updatedData.totalPages;
    const userId = req?.session?.passport?.user;
    const user = await userModel.findById(userId);

    const { first_name, last_name, email, age, rol } = user || {};

    const context = {
      informacionProducto: formattedData,
      existe: data.docs.length > 0,
      categorias: categories,
      pagination: {
        page: data.page,
        totalPages: data.totalPages,
      },
      user: first_name,
      rol: rol,
    };

    const range = Array.from({ length: totalPages }, (_, index) => index + 1);
    context.totalPages = range;

    res.render(__dirname + "/views/index", { context });
  } catch (error) {
    console.log("error al intentar cargar ", error);
  }
});

routerProduct.get("/cargarProductos", auth, async (req, res) => {
  console.log("llege aca"); //!agregar logica para cargar productos nuevos --pendiente
  try {
    res.render(__dirname + "/views/agregarProductos", {});
  } catch (error) {
    res.render(path.join(__dirname, "views/error"), {
      errorMessage: `Error al cargar la pantalla: ${error}`,
    });
  }
});

routerProduct.post("/api/productos", async (req, res) => {
  console.log("req.body", req.body);
});

export default routerProduct;
