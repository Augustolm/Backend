const express = require('express')
const moment = require('moment')
const Contenedor = require('./AugustoMosettigFS')

const app = express();
const PORT = 3333

let visitas = 0

const productos = new Contenedor("productos.txt")


app.get('/', (req, res, next) => {
    const ejecutar = async () => {
        const data = await productos.getAll()
        res.send(data)
        console.log(data)
    }
    ejecutar();

})

app.get('/productoRandom', (req, res, next) => {
    
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    let random = randomNum(1,10);

    const ejecutar2 = async () => {
        const data = await productos.getById(random)
        res.send(data)
    }
    ejecutar2();


    
})



app.get('/visitas', (req, res, next) => {
    
    visitas++
    res.send(`usted ingreso ${visitas}`)
})
app.get('/fyh', (req, res, next) => {
      res.send({fyh: moment().format("DD/MM/YYYY HH:mm:ss")})
})

app.listen(PORT, () => {
    console.log(`servidor http se encuentra en el puerto ${PORT}`);
})