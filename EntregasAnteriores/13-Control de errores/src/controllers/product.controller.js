import CustomError from "../services/Error/CustomError.js";
import { EErrors } from "../services/Error/enums.js";
import ProductService from "../services/products.services.js";

export default class ProductController {
  constructor() {
    this.productoService = new ProductService();
  }

  async createProductController(product) {
    if (!product) {
      throw CustomError.crearError({
        name: "ProductNotFoundError",
        mensaje: "productId, no proporcionado",
        codigo: EErrors.PRODUCT_NOT_FOUND,
      });
    }
    const result = await this.productoService.createProduct(product);
    return result;
  }

  async getProductsController(busqueda = {}, options) {
    if (!options) {
      throw CustomError.crearError({
        name: "ProductNotFoundError",
        mensaje: "options, no proporcionado",
        codigo: EErrors.PRODUCT_NOT_FOUND,
      });
    }
    const result = await this.productoService.getProducts(
      (busqueda = {}),
      options
    );
    return result;
  }

  async getCategoriesController() {
    const categories = await this.productoService.getCategories();
    return categories;
  }

  async getProductByIdController(id) {
    if (!id) {
      throw CustomError.crearError({
        name: "ProductNotFoundError",
        mensaje: "id en getProductByIdController, no proporcionado",
        codigo: EErrors.PRODUCT_NOT_FOUND,
      });
    }
    const result = await this.productoService.getProductById(id);
    return result;
  }

  async updateProductController(id, updateProduct) {
    if (!id || !updateProduct) {
      throw CustomError.crearError({
        name: "ProductNotFoundError",
        mensaje: "id o updateProduct, no proporcionado",
        codigo: EErrors.PRODUCT_NOT_FOUND,
      });
    }
    const result = await this.productoService.updateProduct(id, updateProduct);
    return result;
  }

  async deleteProductController(id) {
    if (!id) {
      throw CustomError.crearError({
        name: "ProductNotFoundError",
        mensaje: "id, no proporcionado",
        codigo: EErrors.PRODUCT_NOT_FOUND,
      });
    }
    const result = await this.productoService.deleteProduct(id);
    return result;
  }

  async updateProductStockController(id, updateProduct) {
    if (!id || !updateProduct) {
      throw CustomError.crearError({
        name: "ProductNotFoundError",
        mensaje: "id o updateProduct, no proporcionado",
        codigo: EErrors.PRODUCT_NOT_FOUND,
      });
    }
    const result = await this.productoService.updateProductStock(
      id,
      updateProduct
    );
    return result;
  }

  async getProductsStockController(id) {
    if (!id) {
      throw CustomError.crearError({
        name: "ProductNotFoundError",
        mensaje: "id, no proporcionado",
        codigo: EErrors.PRODUCT_NOT_FOUND,
      });
    }
    const result = await this.productoService.getProductsStock(id);
    return result;
  }
}
