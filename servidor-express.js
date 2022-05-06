const express = require('express')
const moment = require('moment')

const app = express();

let visitas = 0

app.get('/', (req, res, next) => {
    res.send('<h1>Bienvenido al servidor expres</h1>')

})
app.get('/visitas', (req, res, next) => {
    
    visitas++
    res.send(`usted ingreso ${visitas}`)
})
app.get('/fyh', (req, res, next) => {
      res.send({fyh: moment().format("DD/MM/YYYY HH:mm:ss")})
})

app.listen(8080, () => {
    console.log('servidor levantado');
})