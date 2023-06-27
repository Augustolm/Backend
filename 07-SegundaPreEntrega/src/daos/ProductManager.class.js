
import { connectToDatabase } from "../config/conection.mongoDb.js";
import { productoModel } from "./model/producto.js";




export default class ProductManager {
    constructor() {
        this.initialize();
      }
    
      initialize() {
        connectToDatabase();
      }
      
    async addProduct(product){

      try {
        let result = await productoModel.create(product);
        console.log("pase por aca y guarde", result)
        return result;
      } catch (error) {
        console.log("Error al cargar los productos",error)
      }

    }
 

    async getProducts(){
       try {
        let result = await productoModel.find();
        return result ? result : [];
       } catch (error) {
        console.log("Error al cargar los productos",error);
       }
    }


    async getProductById(id){

        try {
            let result = await productoModel.findById({ _id: id });
            return result;
        } catch (error) {
            console.log(`Error al buscar el producto con id: ${id}`, error);
        }
    }


    async updateProduct(id, updateProduct){
        try {
            let result = await productoModel.updateMany({_id: id}, {$set: updateProduct});
            return result;
        } catch (error) {
            console.log(`Error al actualizar el producto con id: ${id}`, error)
        }
    }


    async deleteProduct(id){

        try {
            let result = await productoModel.deleteOne({_id: id});
            return result;

        } catch (error) {
            console.log(`Error al eliminar el producto con id: ${id}`, error)
        }
    }


}