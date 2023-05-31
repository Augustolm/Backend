
import express from 'express';
import { engine } from 'express-handlebars';
import moment from 'moment';
import { createServer as createHttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import routerProduct from './Router/productos.js';
import ProductManager from './api/ProductManager.js';

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json() );

const httpServer = createHttpServer(app);
const socketServer = new SocketServer(httpServer);

//Productos
const productos = new ProductManager("productos.txt");

//roting
app.use('', routerProduct);


app.engine('handlebars', engine({
  extname: "handlebars",
  defaultLayout: "main",
  layoutsDir: "public",
}))
app.set('view engine', 'handlebars')





//socket

socketServer.on('connect', (socket) => {
      console.log('usuario conectado desde el server', socket.id);


      socket.onAny((eventName, ...args) => {
        console.log('Evento emitido desde el cliente:', eventName, args);
      });


      socket.on('ListaProduct', async (data) => {
        try {
          const newData = await productos.getAll();
          socketServer.emit('ListaProduct', newData);
        } catch (error) {
          console.error("Error al procesar el evento 'ListaProduct':", error);
        }
      });
      

      socket.on('nuevoProducto', async (producto) => {
        try {     
          await productos.save(producto);          
          const data = await productos.getAll();
          socketServer.emit('ListaProduct', data);
        } catch (error) {
          console.error("Error al procesar el mensaje:", error);
        }
      });
      

      socket.on('deleteProduct', async (id) => {
        try {
          console.log("id", id);
          await productos.deleteById(Number(id));
          const data = await productos.getAll();
          socketServer.emit('ListaProduct', data);
        } catch (error) {
          console.error("Error al procesar el mensaje:", error);
        }
      })

  });


  httpServer.listen(8080, () => {
    console.log(`Esta escuchando el puerto ${httpServer.address().port}`);
  });