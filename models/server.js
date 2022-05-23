const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
   
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.productosPath = '/api/productos'
        this.pugPatch = '/api/pug'
        this.ejsPatch = '/api/ejs'

        //Middlewares
        this.middlewares();
        

        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {

        //cors
        this.app.use(cors())


        //lectura del body
        this.app.use(express.urlencoded({ extended: true }));

        //Lectura y escritura del json
        this.app.use(express.json() );


        //directorio public
        this.app.use( express.static('public') )

        //views
        this.app.set('views', './views');
        //this.app.set('view engine', 'pug')
        this.app.set('view engine', 'ejs')
    }
    

    routes() {
        
        //this.app.use(this.usuariosPath , require('../router/rutas'));
        this.app.use(this.productosPath , require('../router/rutas'));
        this.app.use(this.pugPatch, require('../router/rutas'))
        this.app.use(this.ejsPatch, require('../router/rutas'))
    
       
    }

 
    

    listen() {
        
        this.app.listen(this.port,()=>{
            console.log("se conecto en el puerto... localhost:", this.port);
        });
    }

}


module.exports = Server;