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
      throw new Error("Error al obtener los productos");
    }
  }

  async getCategories() {
    try {
      const categories = await productoModel.distinct("category").exec();
      return categories;
    } catch (error) {
      console.log("Error al cargar las categorias", error);
      throw new Error("Error al obtener las categorias");
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
      console.log(`Error al actualizar el producto con id: ${id}`, error);
    }
  }

  async deleteProduct(id) {
    try {
      console.log("id", id);
      let result = await productoModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.log(`Error al eliminar el producto con id: ${id}`, error);
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
      console.log(
        `Error al actualizar el stock del producto con id: ${id}`,
        error
      );
    }
  }

  async getProductsStock(id) {
    try {
      const result = await productoModel.findOne({ _id: id }, { stock: 1 });
      return result;
    } catch (error) {
      console.log(
        `Error al obtener el stock del producto con id: ${id}`,
        error
      );
      throw error;
    }
  }
}
