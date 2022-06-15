const express = require('express');
const {engine} = require('express-handlebars')
const moment = require('moment')
const Knex = require('knex').default

const { Server: HttpServer } = require('http');

const { Server: SocketServer } = require('socket.io');



const option = {
    host: '127.0.0.1',
    user: 'root',
    database: 'clase11'
};


const knex = Knex({
    client: 'mysql2',
    connection: option
})

const crearschamaMensaje = async () => {
  await knex.schema.createTable('mensajes', (tabla)=> {
    tabla.increments('id');
    tabla.string('Author');
    tabla.string('mensaje');
    tabla.string('tiempo')
  })
  await knex.destroy()
} 

const crearschamaProducto = async () => {
  await knex.schema.createTable('productos', (tabla)=> {
    tabla.increments('id');
    tabla.string('titulo');
    tabla.float('precio');
    tabla.string('url')
  })
  await knex.destroy()
}


const borrarTablas = async () => {

  await knex.schema.dropTableIfExists('mensajes')
  await knex.schema.dropTableIfExists('productos')
}

//borrarTablas()
//crearschamaMensaje();
//crearschamaProducto();



const guardarMensaje = async (mensaje) => {
    await knex('mensajes').insert({Author: mensaje.author, mensaje: mensaje.text, tiempo: mensaje.tiempo })
    //await knex.from('mensajes').select('*').then((filas) => console.log(filas));
}

const leerMensaje = async () => {
  let contenido = await knex.select('*').from('mensajes');
  //console.log('esto es contenido',contenido);
  if (contenido === '') {
    return ''
  } else {
    return contenido;
  }
}

const getAll = async () => {
  let contenido = await knex.select('*').from('productos')
  if (contenido === '') {
    console.log('No existen productos');
    let productos = ''
    return productos;
  }else {
    let productos = contenido;
    return productos;
  }
}

const guardarProducto  = async (product) =>  {
  let contenido = await knex.select('*').from('productos');
  let existe = false;
  contenido.forEach(async (item) => {
      if (item.titulo === product.titulo || item.url === product.url || item.precio === product.precio) {
          existe = true;
          console.log('El producto ya existe');
      }
  })
  existe ? console.log('No se pudo cargar el producto porque ya existe') : await knex('productos').insert([{ Titulo: product.titulo,url: product.url,Precio: product.precio }])

  return product;
}



const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json() );

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);








 


const tiempo = moment().format();  
console.log(tiempo);

socketServer.on('connection',async (socket) => {
    socket.emit('messages',await leerMensaje());
    socket.on('new_message',async ({mensaje}) => {

      let { author, text } = mensaje;
      let objTemp = {author, tiempo, text}
      
      guardarMensaje(objTemp)

      let messages = await leerMensaje();
      
      socketServer.sockets.emit('messages', messages);
      //console.log('este es mensaje de socketon',messages);

      
    });

     socket.on('nuevoProducto', async (producto)  => {
      console.log(producto);

      await guardarProducto(producto)
      let data = await getAll() === '' ? '': await getAll()
      socketServer.sockets.emit('producto', data);
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
        const data = await getAll()
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