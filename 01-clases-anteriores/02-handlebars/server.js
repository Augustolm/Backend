const express = require('express');
const app = express();
const {engine} = require('express-handlebars')

const Contenedor = require('../AugustoMosettigFS')
const productos = new Contenedor("productos.txt")

      
app.use(express.urlencoded({ extended: true }));
app.use(express.json() );

app.engine('handlebars', engine({
    extname: "handlebars",
    defaultLayout: "main",
    layoutsDir: "views/layouts",
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


app.post('/', (req, res) => {

  
    let obj = {};
           
    obj.titulo = req.body.titulo;
    obj.precio = req.body.precio;
    obj.url = req.body.imagen;
    let id = productos.save(obj);

    
    console.log(id);
    
    //personas.push({titulo, precio, url})
    res.redirect('/')


})


app.listen(8080, ()=> {
    console.log('Escuchando en el puerto', 8080);
})