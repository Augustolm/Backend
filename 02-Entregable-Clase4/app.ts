import * as fs from "fs";
import { Path, Product } from "./types";
import {
  arrayToFile,
  fileChecker,
  fileToArray,
  ifExist,
} from "./funcionesComplementarias.js";

const path = "./file/productos.txt";

class ProductManager {
  path: string;

  constructor(path: Path) {
    this.path = path;
  }

  async addProduct(product: Product) {
    try {
      //valida que exita el archivo
      await fileChecker(this.path);

      let array = await fileToArray(this.path);
      let longitud = array.length;
      let index = 0;

      if (longitud === 0) {
        index = 1;
      } else {
        index = array[longitud - 1].id + 1;
      }

      product.id = index;
      array.push(product);

      await arrayToFile(this.path, array);

      return product.id;
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      await fileChecker(this.path);
      return await fileToArray(this.path);
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: number) {
    try {
      //valida que exita el archivo
      await fileChecker(this.path);

      let array = await fileToArray(this.path);

      array = array.filter((item: Product) => item.id === id);

      if (array.length === 0)
        throw new Error(`No existe el producto con id ${id}`);
      else return array;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: number, product: Product) {
    try {
      await fileChecker(this.path);
      let array = await fileToArray(this.path);
      let index = array.findIndex((item: Product) => item.id === id);
      if (index === -1) throw new Error(`No existe el producto con id ${id}`);
      else {
        const updatedProduct = { ...array[index], ...product };
        console.log("updatedProduct", updatedProduct);
        array[index] = updatedProduct;
        await arrayToFile(this.path, array);
        return updatedProduct;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: number) {
    try {
      await fileChecker(this.path);

      let array = await fileToArray(this.path);
      let result = await ifExist(this.path, id);

      array = array.filter((item: Product) => item.id !== id);

      if (result) {
        await arrayToFile(this.path, array);
        return `Se elimino el producto con id ${id}`;
      }
      throw new Error(`No existe el producto con id ${id}`);
    } catch (error) {
      throw error;
    }
  }
}

async function main() {
  try {
    let objeto: Product = {
      id: 0,
      title: "Producto 1",
      description: "Descripcion 1",
      price: 100,
      thumbnail: "Foto 1",
      code: "1234",
      stock: 10,
    };
    let objeto2: Product = {
      title: "Producto 1",
      description: "Descripcion 1",
      price: 100,
      thumbnail: "Foto 1",
      code: "4321",
      stock: 5,
    };

    const productManager = new ProductManager(path);

    console.log(await productManager.addProduct(objeto));
    console.log(await productManager.addProduct(objeto));
    console.log(await productManager.addProduct(objeto));
    console.log(await productManager.addProduct(objeto));
    console.log(await productManager.getProducts());
    console.log(await productManager.getProductById(2));
    console.log(await productManager.updateProduct(2, objeto2));
    console.log(await productManager.deleteProduct(3));
    console.log(await productManager.getProducts());
  } catch (error) {
    console.log("El error es: ", error);
  }
}

main();
