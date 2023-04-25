interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  code: string;
  stock: number;
}

interface ProductClass {
  producto: Product[];
  addProduct: (obj: Product) => Product | void;
  getProduct: () => void;
  getProductById: (id?: number) => void;
}

const validationObj = (obj: Product) => {
  if (!obj.title || obj.title === "") {
    throw new Error("El titulo no puede estar vacio");
  } else if (!obj.description || obj.description === "") {
    throw new Error("La descripcion no puede estar vacia");
  } else if (!obj.price || obj.price === 0) {
    throw new Error("El precio no puede ser 0");
  } else if (!obj.thumbnail || obj.thumbnail === "") {
    throw new Error("La imagen no puede estar vacia");
  } else if (!obj.code || obj.code === "") {
    throw new Error("El codigo no puede estar vacio");
  } else if (!obj.stock || obj.stock === 0) {
    throw new Error("El stock no puede ser 0");
  }
};

class ProductManager implements ProductClass {
  constructor(producto: Product[]) {
    this.producto = producto;
  }

  producto: Product[] = [];

  addProduct = (obj: Product) => {
    const idCount = (): number => {
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
    const productos: Product = {
      ...obj,
      id,
    };
    this.producto.push(productos);

    console.log("Producto agregado", productos);
  };

  getProduct = () => {
    console.log("Todos los productos actuales: ", this.producto);
  };

  getProductById = (id?: number) => {
    //En caso de no coincidir ningún id, mostrar en consola un error “Not found”

    if (!id) {
      console.log("Not found");
      return;
    }
    const product = this.producto.find((product) => product.id === id);
    if (product) {
      console.log("Producto encontrado: ", product);
    } else {
      console.log("Producto no encontrado");
    }
  };
}

// crear pruebas

const productManager = new ProductManager([]);

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
