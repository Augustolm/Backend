"use strict";
const validationObj = (obj) => {
    if (!obj.title || obj.title === "") {
        throw new Error("El titulo no puede estar vacio");
    }
    else if (!obj.description || obj.description === "") {
        throw new Error("La descripcion no puede estar vacia");
    }
    else if (!obj.price || obj.price === 0) {
        throw new Error("El precio no puede ser 0");
    }
    else if (!obj.thumbnail || obj.thumbnail === "") {
        throw new Error("La imagen no puede estar vacia");
    }
    else if (!obj.code || obj.code === "") {
        throw new Error("El codigo no puede estar vacio");
    }
    else if (!obj.stock || obj.stock === 0) {
        throw new Error("El stock no puede ser 0");
    }
};
class ProductManager {
    constructor(producto) {
        this.producto = [];
        this.addProduct = (obj) => {
            const idCount = () => {
                const count = this.producto.length;
                if (count > 0) {
                    const lastProduct = this.producto[count - 1];
                    if (lastProduct && lastProduct.id) {
                        return lastProduct.id + 1;
                    }
                }
                return 1;
            };
            validationObj(obj);
            if (this.producto.some((producto) => producto.code === obj.code)) {
                throw new Error("El codigo ya existe");
            }
            const id = idCount();
            const productos = Object.assign(Object.assign({}, obj), { id });
            this.producto.push(productos);
            console.log("Producto agregado", productos);
        };
        this.getProduct = () => {
            console.log("Todos los productos actuales: ", this.producto);
        };
        this.getProductById = (id) => {
            //En caso de no coincidir ningún id, mostrar en consola un error “Not found”
            if (!id) {
                console.log("Not found");
                return;
            }
            const product = this.producto.find((product) => product.id === id);
            if (product) {
                console.log("Producto encontrado: ", product);
            }
            else {
                console.log("Producto no encontrado");
            }
        };
        this.producto = producto;
    }
}
// crear pruebas
const products = new ProductManager([]);
products.addProduct({
    title: "Producto 1",
    description: "Descripcion 1",
    price: 100,
    thumbnail: "Imagen 1",
    code: "Codigo 1",
    stock: 10,
});
products.addProduct({
    title: "Producto 2",
    description: "Descripcion 2",
    price: 200,
    thumbnail: "Imagen 2",
    code: "Codigo 2",
    stock: 20,
});
products.getProduct(); //todo
products.getProductById(); // Error
products.getProductById(1); //solo el 1
products.getProductById(2); //solo el 2
