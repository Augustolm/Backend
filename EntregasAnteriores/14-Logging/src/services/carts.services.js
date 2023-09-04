import CartMongoDAO from "../daos/CartMongoDAO.js";

export default class CartService {
  constructor() {
    this.CartDAO = new CartMongoDAO();
  }

  async createCart() {
    const result = await this.CartDAO.createCart();
    return result;
  }

  async getCartById(id) {
    const result = await this.CartDAO.getCartById(id);
    if (!result) {
      return { error: "No se encontró el carrito" };
    }
    return result;
  }

  async addProductToCart(cardId, productId) {
    const result = await this.CartDAO.addProductToCart(cardId, productId);
    return result;
  }

  async deleteCard(id) {
    const result = await this.CartDAO.deleteCard(id);
    return result;
  }

  async deleteProductFromCart(cardId, productId) {
    const result = await this.CartDAO.deleteProductCard(cardId, productId);
    return result;
  }

  async deleteAllProductsFromCart(cardId, productId) {
    const result = await this.CartDAO.deleteAllProductsCard(cardId, productId);
    return result;
  }
}
