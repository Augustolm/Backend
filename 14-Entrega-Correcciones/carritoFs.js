const fs = require("fs");


class Carrito {
    constructor(archivo) {
      this.archivo = archivo;
  }
  static id = 0;
  static timestamp = Date.now();

  async createCarrito() {
      Carrito.timestamp = Date.now();
      let contenido = await fs.promises.readFile(this.archivo,'utf-8');
      let carritos = JSON.parse(contenido);
      carritos.forEach(prod => {
          if (Carrito.id <= prod.id) {
              Carrito.id++;
          }
          if (Carrito.id == prod.id) {
              Carrito.id++;
          }
      });
      let carrito = {
          id: Carrito.id,
          timestamp: Carrito.timestamp,
          productos: []
      }
      let json = '';
      json = JSON.stringify([...carritos,carrito]);
      await fs.promises.writeFile(this.archivo,json,(err) => {
          if (err) {
              console.log('Hubo un error al cargar el carrito');
          } else {
              console.log(carrito.id);
          }
      })
      return carrito;
  }

  async saveProductInCart(id,product) {
      let json = '';
      let contenido = await fs.promises.readFile(this.archivo,'utf-8');
      let carritos = JSON.parse(contenido);
      try {
          let carritoElegido = carritos.find(cart => cart.id === id);
          carritoElegido.productos.push(product);
          console.log(carritos);
          json = JSON.stringify(carritos);
          await fs.promises.writeFile(this.archivo,json,(err) => {
              if (err) {
                  console.log('Hubo un error al cargar el producto');
              } else {
                  console.log(producto.id);
              }
          })



      } catch (error) {
          console.log(error);
      }
      return carritos;
  }

  async getById(id) {
      let contenido = await fs.promises.readFile(this.archivo,'utf-8')
      let carritos = JSON.parse(contenido);
      let carrito = carritos.find(cart => cart.id === id);
      if (carrito) {
          console.log(carrito);
      } else {
          console.log('No existe el carrito');
      }
      return carrito;
  }

  async getAll() {
      let contenido = await fs.promises.readFile(this.archivo,'utf-8')
      let productos = JSON.parse(contenido);
      console.log(productos);
      return productos;
  }

  async deleteCart(id) {
      let contenido = await fs.promises.readFile(this.archivo,'utf-8')
      let carritos = JSON.parse(contenido);
      let arraySinElCarrito = await carritos.filter(cart => cart.id !== parseInt(id));
      fs.writeFile(this.archivo,JSON.stringify(arraySinElCarrito),(err) => {
          if (err) {
              console.log('Hubo un error al eliminar el producto');
          } else {
              console.log('Carrito eliminado');
          }
          return carritos
      })
}

    async deleteProdInCart(id,product) {
        let contenido = await fs.promises.readFile(this.archivo, 'utf-8')
        let carritos = JSON.parse(contenido);
        let carritoElegido = carritos.find(cart => cart.id == id);
        let arraySinElPorudcto = await carritoElegido.productos.filter(prod => prod.id != product);
        carritoElegido.productos = arraySinElPorudcto;
        fs.writeFile(this.archivo,JSON.stringify(carritos),(err) => {
            if(err)
                console.log('Hubo un error al eliminar el producto');
            else{
                console.log('Producto Eliminado');
            }
            })
    

    }




}
module.exports = Carrito;