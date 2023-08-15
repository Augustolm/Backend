import CartService from "../services/carts.services.js";
import ProductController from "./product.controller.js";

export default class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  async createCartController() {
    const result = await this.cartService.createCart();
    return result;
  }

  async getCartByIdController(id) {
    if (!id) {
      return { error: "No se encontró el carrito" };
    }
    const result = await this.cartService.getCartById(id);
    return result;
  }

  async addProductToCartController(cardId, productId) {
    const result = await this.cartService.addProductToCart(cardId, productId);
    return result;
  }

  async deleteCardController(id) {
    const result = await this.cartService.deleteCard(id);
    return result;
  }

  async deleteProductFromCartController(cardId, productId) {
    const result = await this.cartService.deleteProductFromCart(
      cardId,
      productId
    );
    return result;
  }

  async deleteAllProductsFromCartController(cardId, productId) {
    const result = await this.cartService.deleteAllProductsFromCart(
      cardId,
      productId
    );
    return result;
  }
}
