import { Router } from "express";
import ProductManager from "../daos/ProductManager.class.js";
import __dirname, { auth } from "../app.js";

const routerProduct = Router();
const product = new ProductManager();

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

    const categories = await product.getCategories();
    const data = await product.getProducts(filters, options);

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
    const updatedData = await product.getProducts(filters, updatedOptions);

    const totalPages = updatedData.totalPages;

    console.log("usuario: req.session?.user.nombre,", req?.session);

    const context = {
      informacionProducto: formattedData,
      existe: data.docs.length > 0,
      categorias: categories,
      pagination: {
        page: data.page,
        totalPages: data.totalPages,
      },
      user: req?.session?.user?.name,
      rol: req?.session?.user?.rol,
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
