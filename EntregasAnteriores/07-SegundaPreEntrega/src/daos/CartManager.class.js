
//import { connectToDatabase } from "../config/conection.mongoDb.js";
import { cartModel } from "./model/carts.model.js";
import { productoModel } from "./model/producto.js";


export default class CartManager {


  async createCard() {
    try {
      const emptyCard = {}; 
      const result = await cartModel.create(emptyCard);
      return result._id; 
    } catch (error) {
      console.log("Error al cargar los productos", error);
    }
  }




    async getCartById(id) {
            try {
                let result = await cartModel.findById({ _id: id });
                return result;
            } catch (error) {
                console.log(`Error al buscar el producto con id: ${id}`, error);
            }
    }


    async addProductToCart(cardId, productId) {
        try {
          let cart = await cartModel.findById(cardId);
    
          if (!cart) {
            console.log(`No se encontró el carrito con ID: ${cardId}`);
            return;
          }
    
          const product = await productoModel.findById(productId);
    
          if (!product) {
            console.log(`No se encontró el producto con ID: ${productId}`);
            return;
          }
    
          const cartItem = {
            product: product._id, 
          };
    

          cart.products.push(cartItem);
    

          await cart.save();
    
          console.log(`Producto con ID ${productId} agregado al carrito con ID ${cardId}`);
        } catch (error) {
          console.log(`Error al agregar el producto al carrito: ${error}`);
        }
      }

      async deleteCard(id) {
        try {
          const result = await cartModel.findByIdAndDelete(id);
          if (result) {
            console.log(`Carrito con ID ${id} eliminado correctamente`);
          } else {
            console.log(`No se encontró el carrito con ID: ${id}`);
          }
        } catch (error) {
          console.log(`Error al eliminar el carrito con ID ${id}: ${error}`);
        }
      }

        
      async deleteProductCard(cardId, productId) {
        try {
          const cart = await cartModel.findOne({ _id: cardId });
      
          if (!cart) {
            console.log(`No se encontró el carrito con ID: ${cardId}`);
            return;
          }
      
          const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
      
          if (productIndex === -1) {
            console.log(`El producto con ID ${productId} no existe en el carrito con ID ${cardId}`);
            return;
          }
      
          cart.products.splice(productIndex, 1);
      
          await cart.save();
      
          console.log(`Producto con ID ${productId} eliminado del carrito con ID ${cardId}`);
        } catch (error) {
          console.log(`Error al eliminar el producto del carrito: ${error}`);
        }
      }
      

}