const express = require('express');
const {engine} = require('express-handlebars')
const moment = require('moment')
const { Server: HttpServer } = require('http');

const { Server: SocketServer } = require('socket.io');







const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json() );

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);


const Contenedor = require('./AugustoMosettigFS')
const ContenedorLog = require('./log')
const Logs = new ContenedorLog("Logs.txt");
const productos = new Contenedor("productos.txt")






// const ejecutar2 = async () => {
//     const messages = await Logs.getAll()
//     console.log('esta es la respeusta que esperamos',await Logs.getAll());
//   }
//   ejecutar2();


  messages = []


const tiempo = moment().format();  
console.log(tiempo);

socketServer.on('connection', (socket) => {
    socket.emit('messages', messages);
    socket.on('new_message', ({mensaje}) => {

      let { author, text } = mensaje;
      let objTemp = {author, tiempo, text}
      console.log(objTemp);

      messages.push(objTemp);
      
      socketServer.sockets.emit('messages', messages);
      //console.log('este es mensaje de socketon',messages);

      const ejecutar = async () => {
        await Logs.saveLog(messages)
      }
      ejecutar();
});

     socket.on('nuevoProducto', (producto)  => {
      console.log(producto);

      
      
      const ejecutar = async () => {
        productos.save(producto);
        const data = await productos.getAll()
                
          socketServer.sockets.emit('producto', data);
       
               console.log(data);
            }


                ejecutar();   
   
        })
    
      });


app.engine('handlebars', engine({
    extname: "handlebars",
    defaultLayout: "main",
    layoutsDir: "public",
}))
app.set('view engine', 'handlebars')



//roting

app.get('/', (req, res) => {
  const ejecutar = async () => {
        const data = await productos.getAll()
                if(data.length)
                existe = true
                else
                existe = false
                // console.log(data);
                res.render('index', {
                    informacionProducto: data,
                    existe: existe
                })
            }
                ejecutar();    
})


  httpServer.listen(8080, () => {
    console.log('Estoy escuchando en el puerto 8080');
  });