
import express from 'express';
import { engine } from 'express-handlebars';
import { createServer as createHttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import routerProduct from './Router/productos.js';
//import ProductManager from './daos/filesistem/ProductManager.js';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import ProductManager from './daos/mongodb/ProductManager.class.js';
import ChatManager from './daos/mongodb/chatManager.class.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export default __dirname;



const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json() );

const httpServer = createHttpServer(app);
const socketServer = new SocketServer(httpServer);


const productos = new ProductManager();
const chatManager = new ChatManager();

//roting


app.engine('handlebars', engine({
  extname: 'handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'public'),
}));
app.set('view engine', 'handlebars');



//socket

socketServer.on('connect', (socket) => {
  console.log('usuario conectado desde el server', socket.id);

  socket.onAny((eventName, ...args) => {
    console.log('Evento emitido desde el cliente:', eventName, args);
  });

  socket.on('ListaProduct', async () => {
    try {
      const data = await productos.getProducts();
      socketServer.emit('ListaProduct', data);
    } catch (error) {
      console.error("Error al procesar el evento 'ListaProduct':", error);
    }
  });

  socket.on('nuevoProducto', async (producto) => {
    try {
      await productos.addProduct(producto);
      const data = await productos.getProducts();
      socketServer.emit('ListaProduct', data);
      socket.emit('tiendaProduct', data);
    } catch (error) {
      console.error("Error al procesar el mensaje:", error);
    }
  });



  socket.on('deleteProduct', async (id) => {
    try {   
      await productos.deleteProduct(id);
      const data = await productos.getProducts();
      socketServer.emit('ListaProduct', data);
      socket.emit('tiendaProduct', data);
    } catch (error) {
      console.error("Error al procesar el mensaje:", error);
    }
  });

  socket.on('chat', async (mensaje) => {
    try {
      
      await chatManager.createChat(mensaje);
      const chatbox = await chatManager.getChat();
      socketServer.emit('chatBox', chatbox);
    } catch (error) {
      console.error("Error al escuchar el mensaje:", error);
    }
  });

  socket.on('chatBox', async () => {
    try {
      const chatbox = await chatManager.getChat();
      socketServer.emit('chatBox', chatbox);
    } catch (error) {
      console.error("Error al escuchar el mensaje:", error);
    }
  });
});




  
  
  
  app.use('', routerProduct);

  httpServer.listen(8080, () => {
    console.log(`Esta escuchando el puerto ${httpServer.address().port}`);
  });