import CustomError from "../services/Error/CustomError.js";
import { EErrors } from "../services/Error/enums.js";
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
      throw CustomError.crearError({
        name: "CartNotFoundError",
        mensaje: "Id, no proporcionado",
        codigo: EErrors.CART_NOT_FOUND,
      });
    }
    const result = await this.cartService.getCartById(id);
    return result;
  }

  async addProductToCartController(cardId, productId) {
    if (!cardId || !productId) {
      throw CustomError.crearError({
        name: "CartNotFoundError",
        mensaje: "cardId o productId, no proporcionado",
        codigo: EErrors.CART_NOT_FOUND,
      });
    }
    const result = await this.cartService.addProductToCart(cardId, productId);
    return result;
  }

  async deleteCardController(id) {
    if (!id) {
      throw CustomError.crearError({
        name: "CartNotFoundError",
        mensaje: "Id, no proporcionado",
        codigo: EErrors.CART_NOT_FOUND,
      });
    }
    const result = await this.cartService.deleteCard(id);
    return result;
  }

  async deleteProductFromCartController(cardId, productId) {
    if (!cardId || !productId) {
      throw CustomError.crearError({
        name: "CartNotFoundError",
        mensaje: "cardId o productId, no proporcionado",
        codigo: EErrors.CART_NOT_FOUND,
      });
    }
    const result = await this.cartService.deleteProductFromCart(
      cardId,
      productId
    );
    return result;
  }

  async deleteAllProductsFromCartController(cardId, productId = []) {
    if (!cardId) {
      throw CustomError.crearError({
        name: "CartNotFoundError",
        mensaje: "cardId o productId, no proporcionado",
        codigo: EErrors.CART_NOT_FOUND,
      });
    }
    const result = await this.cartService.deleteAllProductsFromCart(
      cardId,
      productId
    );
    return result;
  }
}
