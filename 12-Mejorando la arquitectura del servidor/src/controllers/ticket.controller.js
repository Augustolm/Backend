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

    const stockUpdatePromises = ticket.products.map(async (product) => {
      const productStock =
        await this.productController.getProductsStockController(
          product.product
        );

      console.log("Stock del producto", productStock);
      // Verificar si hay suficiente stock antes de restar 1
      if (productStock.stock >= 1) {
        productosConStock.push(product);
        return this.productController.updateProductStockController(
          product.product,
          {
            stock: -1,
          }
        );
      } else {
        productosSinStock.push(product);
        return product; // Retornar el producto sin actualizar el stock
      }
    });

    try {
      // Ejecutar todas las actualizaciones de stock en paralelo
      await Promise.all(stockUpdatePromises);

      // Crear el ticket con los productos que tienen suficiente stock
      const result = await this.ticketService.createTicket({
        ...ticket,
        products: productosConStock,
      });

      console.log("Stocks actualizados y ticket creado correctamente");

      // Si hay productos sin suficiente stock, retornar el array de productos
      if (productosSinStock.length > 0) {
        return productosSinStock;
      }

      return result;
    } catch (error) {
      console.error("Error en la creación del ticket:", error);
      throw error; // Relanzar el error para manejarlo en niveles superiores
    }
  }

  async getTicketByIdController(id) {
    const result = await this.ticketService.getTicketById(id);
    return result;
  }
}
