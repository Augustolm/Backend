import ProductMongoDAO from "../daos/ProductMongoDAO.js";

export default class ProductService {
  constructor() {
    this.productDAO = new ProductMongoDAO();
  }

  async createProduct(product) {
    const result = await this.productDAO.addProduct(product);
    return result;
  }

  async getProducts(busqueda = {}, options) {
    const result = await this.productDAO.getProducts((busqueda = {}), options);
    return result;
  }

  async getCategories() {
    const categories = await this.productDAO.getCategories();
    return categories;
  }

  async getProductById(id) {
    const result = await this.productDAO.getProductById(id);
    return result;
  }

  async updateProduct(id, updateProduct) {
    const result = await this.productDAO.updateProduct(id, updateProduct);
    return result;
  }

  async deleteProduct(id) {
    const result = await this.productDAO.deleteProduct(id);
    return result;
  }
}
