
import express from 'express';
import { engine } from 'express-handlebars';
import { createServer as createHttpServer } from 'http';
//import ProductManager from './daos/filesistem/ProductManager.js';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import routerProduct from './Router/router.product.js';
import handlebars from 'handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import routerCars from './Router/router.cars.js';
import routerLogin from './Router/router.login.js';
import fileStore  from 'session-file-store';
import MongoStore from 'connect-mongo';
import { connectionURL } from './config/conection.mongoDb.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json() );
const httpServer = createHttpServer(app);

//fileStore
const Filestorage = fileStore(session);


//cookies
app.use(cookieParser());

//session

app.use(session({
 // store: new Filestorage({path: './src/sessions', ttl: 100, retries: 0}),
 store: MongoStore.create({
  mongoUrl: connectionURL,
  mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  ttl: 15,
}),
  secret: 'mi secreto',
  resave: false,
  saveUninitialized: false,
}));



export function auth(req, res, next) {
  console.log("req.session", req.session)
  if (req.session && req.session.user === "pepe" && req.session.rol === "admin") {
    return next();
  } else {
    res.render(path.join(__dirname, 'views/error'), { errorMessage: 'Acceso no autorizado ERROR 403' }).status(403);
  }
}

//error 401 autenticacion

//error 403 faltan credenciales

app.get('/session', async (req, res) => {
  req.session.user = 'pepe';
  req.session.rol = "admin";
  req.session.visitas = req.session.visitas ? req.session.visitas + 1 : 1;
  console.log("req.session", req.session)

  res.send(`El isiario ${req.session.user} tiene el rol ${req.session.rol} y ha visitado la pagina ${req.session.visitas} veces`);
})

app.get('/distroy', async (req, res) => {
  req.session.destroy();
  console.log("req.session", req.session)

  res.send(`Sesion destruida`);
})


//roting
app.use('', auth, routerLogin);


//roting
app.use('', routerProduct);
app.use('/api', routerCars);

//Handelbars
const eq = (a, b) => {
  return a === b;
};


app.engine('handlebars', engine({
  extname: 'handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: {
    eq: eq,
  }
}));
app.set('view engine', 'handlebars');

httpServer.listen(8080, () => {
  console.log(`Esta escuchando el puerto ${httpServer.address().port}`);
});
  
  


