import CustomError from "../services/Error/CustomError.js";
import { EErrors } from "../services/Error/enums.js";
import { productoModel } from "./model/producto.js";

export default class ProductMongoDAO {
  async addProduct(product) {
    try {
      let result = await productoModel.create(product);
      return result;
    } catch (error) {
      console.log("Error al cargar los productos", error);
    }
  }

  async getProducts(busqueda = {}, options) {
    try {
      const result = await productoModel.paginate(busqueda, options);
      return result;
    } catch (error) {
      throw CustomError.crearError({
        name: "ProductDAOError",
        mensaje: "Error al obtener los productos",
        codigo: EErrors.PRODUCT_DAO_ERROR,
        cause: error,
      });
    }
  }

  async getCategories() {
    try {
      const categories = await productoModel.distinct("category").exec();
      return categories;
    } catch (error) {
      throw CustomError.crearError({
        name: "ProductDAOError",
        mensaje: "Error al obtener las categorias",
        codigo: EErrors.PRODUCT_DAO_ERROR,
        cause: error,
      });
    }
  }

  async getProductById(id) {
    try {
      let result = await productoModel.findById({ _id: id });
      return result;
    } catch (error) {
      console.log(`Error al buscar el producto con id: ${id}`, error);
    }
  }

  async updateProduct(id, updateProduct) {
    try {
      let result = await productoModel.updateMany(
        { _id: id },
        { $set: updateProduct }
      );
      return result;
    } catch (error) {
      throw CustomError.crearError({
        name: "ProductDAOError",
        mensaje: "Error al actualizar el producto",
        codigo: EErrors.PRODUCT_DAO_ERROR,
        cause: error,
      });
    }
  }

  async deleteProduct(id) {
    try {
      console.log("id", id);
      let result = await productoModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      throw CustomError.crearError({
        name: "ProductDAOError",
        mensaje: "Error al eliminar el producto",
        codigo: EErrors.PRODUCT_DAO_ERROR,
        cause: error,
      });
    }
  }

  async updateProductStock(id, updateProduct) {
    try {
      let result = await productoModel.updateMany(
        { _id: id },
        { $inc: updateProduct }
      );
      return result;
    } catch (error) {
      throw CustomError.crearError({
        name: "ProductDAOError",
        mensaje: "Error al actualizar el stock del producto",
        codigo: EErrors.PRODUCT_DAO_ERROR,
        cause: error,
      });
    }
  }

  async getProductsStock(id) {
    try {
      const result = await productoModel.findOne({ _id: id }, { stock: 1 });
      return result;
    } catch (error) {
      throw CustomError.crearError({
        name: "ProductDAOError",
        mensaje: "Error al obtener el stock del producto",
        codigo: EErrors.PRODUCT_DAO_ERROR,
        cause: error,
      });
    }
  }
}
