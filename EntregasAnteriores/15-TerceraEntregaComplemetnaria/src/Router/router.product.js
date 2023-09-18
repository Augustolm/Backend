import { Router } from "express";
import __dirname from "../app.js";
import { auth } from "../utils/auth.rol.js";
import { userModel } from "../daos/model/user.model.js";
import ProductController from "../controllers/product.controller.js";
import formatProduct from "../utils/productos.js";
import path from "path";
import userController from "../controllers/user.controller.js";

const routerProduct = Router();

let productController = new ProductController();
let usersController = new userController();

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

    const formatData = formatProduct(data);

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
      informacionProducto: formatData,
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
    req.logger.warn("Error al intentar cargar", { error: error });
  }
});

routerProduct.get("/cargarProductos", auth, async (req, res) => {
  try {
    const { docs } = await productController.getProductsController();

    const formattedProducts = docs.map((product) => {
      return {
        _id: product._id,
        title: product.title,
        price: product.price,
        stock: product.stock,
        owner: product.owner,
      };
    });

    res.render(__dirname + "/views/agregarProductos", {
      productos: formattedProducts,
    }); // Pasar los productos reformateados a la vista
  } catch (error) {
    res.render(path.join(__dirname, "views/error"), {
      errorMessage: `Error al cargar la pantalla: ${error}`,
    });
  }
});

routerProduct.post("/api/addproductos", auth, async (req, res) => {
  req.logger.info("Request body:", { requestBody: req.body });
  try {
    const userId = req.session.passport.user;

    const user = await usersController.getUserByIdController(userId);

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    if (user.rol.toUpperCase() === "PREMIUM") {
      req.body.owner = userId;
    }

    const result = await productController.createProductController(req.body);

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Ocurrió un error al crear el producto");
  }
});

routerProduct.delete("/api/borrarProduct", auth, async (req, res) => {
  req.logger.info("Producto id a eliminar:", { ProductoID: req.query.id });

  try {
    const userId = req.session.passport.user;
    const user = await usersController.getUserByIdController(userId);
    const product = await productController.getProductByIdController(
      req.query.id
    );

    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    if (user.rol.toUpperCase() === "ADMIN") {
      const result = await productController.deleteProductController(
        req.query.id
      );
      return res.status(201).send(result);
    }

    if (
      user.rol.toUpperCase() === "PREMIUM" &&
      product.owner.toUpperCase() === userId.toUpperCase()
    ) {
      const result = await productController.deleteProductController(
        req.query.id
      );
      return res.status(201).send(result);
    }

    return res
      .status(401)
      .send({ message: "No tienes permiso para eliminar este producto" });
  } catch (error) {
    res.status(500).send("Ocurrió un error al eliminar el producto");
  }
});

//!! Borrar luego de la entrega!

routerProduct.get("/loggerTest", (req, res) => {
  req.logger.warn("Alert");
  req.logger.error("Fatal ERROR"); // Cambiado de "fatal" a "error"
  req.logger.error("Error normal.. ");
  req.logger.info("parametros req:", { req: req.body });

  res.send("Logger test");
});

export default routerProduct;
