const express = require('express')
const {Server: HttpServer} = require('http')
const { SocketAddress } = require('net')
const {Server: IOServer } = require('socket.io')


const mensajes = []


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

httpServer.listen(3000, ()=> console.log("server ON"))

io.on('connection', (socket) => {
    console.log('Se conectó un usuario');
    socket.on('mensaje', (mensaje) => {
      mensajes.push(`[${socket.id}]: ${mensaje}`);
      io.sockets.emit('mensajes', mensajes.join(`\n`));
    })
  });