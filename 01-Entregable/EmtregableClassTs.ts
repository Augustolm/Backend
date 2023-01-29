interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  code: string;
  stock: number;
}

interface ProductClass {
  producto: Product[];
  idCount: () => number;
  codeValidator: (code: string) => boolean;
  addProduct: (obj: Product) => any;
  getProductById: (id: number) => any;
}

class ProductManager implements ProductClass {
  producto: Product[] = [];

  idCount = (): number => {
    const count = this.producto.length;
    if (count > 0) {
      return this.producto[count - 1].id + 1;
    } else {
      return 1;
    }
  };
  codeValidator = (code: string): any => {
    try {
      const valodateCode = this.producto.some(
        (producto) => producto.code === code
      );
      return valodateCode;
    } catch (error) {
      console.log(error);
    }
  };

  async addProduct({
    id = isRequired("id"),
    title = isRequired("title"),
    description = isRequired("description"),
    price = isRequired("price"),
    thumbnail = isRequired("thumbnail"),
    code = isRequired("code"),
    stock = isRequired("stock"),
  }: Product) {
    try {
      if (this.codeValidator(code)) {
        throw new Error("El codigo ya existe");
      }

      const id = await this.idCount();
      const productos: Product = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      const guardarProducto = this.producto.push(productos);
      return this.producto;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id: number): Promise<any> {
    try {
      const producto = this.producto.find((producto) => producto.id === id);
      if (producto === undefined) {
        throw new Error("El producto no existe");
      }
      return producto;
    } catch (error) {
      console.log(error);
    }
  }
}

function isRequired(nombre: string): any {
  throw new Error(`${nombre} es un campo requerido`);
}

async function main() {
  try {
    const obj: Product = {
      id: 0,
      title: "Producto 1",
      description: "Descripción del producto 1",
      price: 100,
      thumbnail: "urlfaltante",
      code: "akjshbfalksjbfg55454",
      stock: 10,
    };
    const obj2: Product = {
      id: 0,
      title: "Producto 2",
      description: "Descripción del producto 2",
      price: 88,
      thumbnail: "urlfaltante",
      code: "akjshbfalksjbfg55453",
      stock: 5,
    };

    const productos = new ProductManager();
    console.log(await productos.addProduct(obj));
    console.log(await productos.addProduct(obj2));
    console.log(await productos.getProductById(2));
  } catch (error) {
    console.log(error);
  }
}

main();
