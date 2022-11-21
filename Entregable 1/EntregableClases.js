const isRequired = function (nombre) {
    throw new Error(`${nombre} es un campo requerido`)
};

class ProductManager {
    constructor(producto = []) {
        this.producto = producto;
    }

    idValidator = () => {
        const count = this.producto.length;
       // (count > 0) ? code = this.producto[count - 1].code + 1 :  1;
        if(count > 0) {
            return this.producto[count - 1].id + 1
        } else {
           return 1;
        }
    }
     codeValidator = (code) => {
        try {
         const valodateCode = this.producto.find((producto) => producto.code === code);
            return valodateCode
        } catch (error) {
            console.log(error)
        }
    }

    async addProduct(
        {
         title = isRequired('title'),
         description = isRequired('description'),
         price = isRequired('price'),
         thumbnail = isRequired('thumbnail'),
         code= isRequired('code'),
         stock= isRequired('stock'),
        })  {
        try {
           
            if(await this.codeValidator(code)) {
                throw new Error('El code ya existe')
            }

           const id = await this.idValidator();
            const productos = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            }
           const guardarProducto = this.producto.push(productos);
            return this.producto
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            const producto = this.producto.find((producto) => producto.id === id);
            if(producto === undefined) {
                throw new Error('El producto no existe')
            }
            return producto
        } catch (error) {
            console.log(error)
        }
    }
}


async function main() {
    try {
        const obj = {
            title: 'Producto 1',
            description: 'Descripción del producto 1',
            price: 100,
            thumbnail: 'urlfaltante',
            code: 'akjshbfalksjbfg55454',
            stock: 10,
        }
        const obj2 = {
            title: 'Producto 2',
            description: 'Descripción del producto 2',
            price: 88,
            thumbnail: 'urlfaltante',
            code: 'akjshbfalksjbfg55452',
            stock: 5,
        }

        productos = new ProductManager();
        console.log(await productos.addProduct(obj))
        console.log(await productos.addProduct(obj2))
        console.log(await productos.getProductById(1))

    } catch (error) {
        console.log(error)
    }
}

main()