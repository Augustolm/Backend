import ProductService from "../services/products.services.js";

export default class ProductController {
  constructor() {
    this.productoService = new ProductService();
  }

  async createProductController(product) {
    const result = await this.productoService.createProduct(product);
    return result;
  }

  async getProductsController(busqueda = {}, options) {
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
    const result = await this.productoService.getProductById(id);
    return result;
  }

  async updateProductController(id, updateProduct) {
    const result = await this.productoService.updateProduct(id, updateProduct);
    return result;
  }

  async deleteProductController(id) {
    const result = await this.productoService.deleteProduct(id);
    return result;
  }

  async updateProductStockController(id, updateProduct) {
    const result = await this.productoService.updateProductStock(
      id,
      updateProduct
    );
    return result;
  }

  async getProductsStockController(id) {
    const result = await this.productoService.getProductsStock(id);
    return result;
  }
}
