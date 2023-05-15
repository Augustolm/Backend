var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { arrayToFile, fileChecker, fileToArray, ifExist, } from "./funcionesComplementarias.js";
const path = "./file/productos.txt";
class ProductManager {
    constructor(path) {
        this.path = path;
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //valida que exita el archivo
                yield fileChecker(this.path);
                let array = yield fileToArray(this.path);
                let longitud = array.length;
                let index = 0;
                if (longitud === 0) {
                    index = 1;
                }
                else {
                    index = array[longitud - 1].id + 1;
                }
                product.id = index;
                array.push(product);
                yield arrayToFile(this.path, array);
                return product.id;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fileChecker(this.path);
                return yield fileToArray(this.path);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //valida que exita el archivo
                yield fileChecker(this.path);
                let array = yield fileToArray(this.path);
                array = array.filter((item) => item.id === id);
                if (array.length === 0)
                    throw new Error(`No existe el producto con id ${id}`);
                else
                    return array;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fileChecker(this.path);
                let array = yield fileToArray(this.path);
                let index = array.findIndex((item) => item.id === id);
                if (index === -1)
                    throw new Error(`No existe el producto con id ${id}`);
                else {
                    const updatedProduct = Object.assign(Object.assign({}, array[index]), product);
                    console.log("updatedProduct", updatedProduct);
                    array[index] = updatedProduct;
                    yield arrayToFile(this.path, array);
                    return updatedProduct;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fileChecker(this.path);
                let array = yield fileToArray(this.path);
                let result = yield ifExist(this.path, id);
                array = array.filter((item) => item.id !== id);
                if (result) {
                    yield arrayToFile(this.path, array);
                    return `Se elimino el producto con id ${id}`;
                }
                throw new Error(`No existe el producto con id ${id}`);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let objeto = {
                id: 0,
                title: "Producto 1",
                description: "Descripcion 1",
                price: 100,
                thumbnail: "Foto 1",
                code: "1234",
                stock: 10,
            };
            let objeto2 = {
                title: "Producto 1",
                description: "Descripcion 1",
                price: 100,
                thumbnail: "Foto 1",
                code: "4321",
                stock: 5,
            };
            const productManager = new ProductManager(path);
            console.log(yield productManager.addProduct(objeto));
            console.log(yield productManager.addProduct(objeto));
            console.log(yield productManager.addProduct(objeto));
            console.log(yield productManager.addProduct(objeto));
            console.log(yield productManager.getProducts());
            console.log(yield productManager.getProductById(2));
            console.log(yield productManager.updateProduct(2, objeto2));
            console.log(yield productManager.deleteProduct(3));
            console.log(yield productManager.getProducts());
        }
        catch (error) {
            console.log("El error es: ", error);
        }
    });
}
main();
