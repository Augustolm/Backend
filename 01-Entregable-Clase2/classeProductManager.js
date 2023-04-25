var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var validationObj = function (obj) {
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
var ProductManager = /** @class */ (function () {
    function ProductManager(producto) {
        var _this = this;
        this.producto = [];
        this.addProduct = function (obj) {
            var idCount = function () {
                var count = _this.producto.length;
                if (count > 0) {
                    var lastProduct = _this.producto[count - 1];
                    if (lastProduct && lastProduct.id) {
                        return lastProduct.id + 1;
                    }
                }
                return 1;
            };
            validationObj(obj);
            if (_this.producto.some(function (producto) { return producto.code === obj.code; })) {
                throw new Error("El codigo ya existe");
            }
            var id = idCount();
            var productos = __assign(__assign({}, obj), { id: id });
            _this.producto.push(productos);
            console.log("Producto agregado", productos);
        };
        this.getProduct = function () {
            console.log("Todos los productos actuales: ", _this.producto);
        };
        this.getProductById = function (id) {
            //En caso de no coincidir ningún id, mostrar en consola un error “Not found”
            if (!id) {
                console.log("Not found");
                return;
            }
            var product = _this.producto.find(function (product) { return product.id === id; });
            if (product) {
                console.log("Producto encontrado: ", product);
            }
            else {
                console.log("Producto no encontrado");
            }
        };
        this.producto = producto;
    }
    return ProductManager;
}());
// crear pruebas
var productManager = new ProductManager([]);
productManager.addProduct({
    title: "Producto 1",
    description: "Descripcion 1",
    price: 100,
    thumbnail: "Imagen 1",
    code: "Codigo 1",
    stock: 10,
});
productManager.addProduct({
    title: "Producto 2",
    description: "Descripcion 2",
    price: 200,
    thumbnail: "Imagen 2",
    code: "Codigo 2",
    stock: 20,
});
productManager.getProduct(); //todo
productManager.getProductById(); // Error
productManager.getProductById(1); //solo el 1
productManager.getProductById(2); //solo el 2
