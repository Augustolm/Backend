const express = require('express');
const app = express();
const PORT = 8080;
const Contenedor = require('./ProductManager');
const productos = new Contenedor('./productos.txt')

app.use(express.urlencoded({ extended: true }));


app.get('/', async(req, res) => {
    try {
        let { limit } = req.query;
        const data = await productos.getAll()
       if(limit)
            {
                res.send(data.slice(0,limit));
            }
        else
            {
                res.send(data);
            }
       //limit ? res.status(200).res.send(data.slice(0, limit)) : res.status(200).res.send(data)    
    } catch (error) {
        console.log(error)
    }
})

app.get('/:pid', async(req, res) => {
    try {
        const { pid } = req.params;
        const data = await productos.getById(Number(pid))
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})


app.listen(PORT, () => {
    console.log('Servidor escuchando en http://localhost:8080');
})
