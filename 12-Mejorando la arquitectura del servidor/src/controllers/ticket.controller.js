import ticketServices from "../services/ticket.services.js";
import ProductController from "./product.controller.js";

export default class TicketController {
  constructor() {
    this.ticketService = new ticketServices();
    this.productController = new ProductController();
  }

  async createTicketController(ticket) {
    console.log("Ticket formato de objeto", ticket);

    const productosConStock = [];
    const productosSinStock = [];

    let totalPrice = 0;

    const stockUpdatePromises = ticket.products.map(async (product) => {
      const productStock =
        await this.productController.getProductsStockController(
          product.product
        );

      console.log("Stock del producto", productStock);

      if (productStock.stock >= 1) {
        productosConStock.push(product);
        totalPrice += product.price;
        return this.productController.updateProductStockController(
          product.product,
          { stock: -1 }
        );
      } else {
        productosSinStock.push(product);
        return product;
      }
    });

    try {
      await Promise.all(stockUpdatePromises);

      const result = await this.ticketService.createTicket({
        ...ticket,
        products: productosConStock,
      });

      console.log("Stocks actualizados y ticket creado correctamente");

      //!No tendria que pasar por este caso, Ej en mercadolibre no te deja comprar si no hay stock, o no te deja agregar mas productos de los que hay en stock en el carrito
      if (productosSinStock.length > 0) {
        const purchaserEmail = ticket.purchaser;
        const ticketData = {
          code: result.code,
          totalPrice: totalPrice,
          purchaser: purchaserEmail,
          productosConStock: productosConStock,
          productosSinStock: productosSinStock,
        };

        return ticketData;
      }

      return result;
    } catch (error) {
      console.error("Error en la creación del ticket:", error);
      throw error;
    }
  }

  async getTicketByIdController(id) {
    const result = await this.ticketService.getTicketById(id);
    return result;
  }
}
