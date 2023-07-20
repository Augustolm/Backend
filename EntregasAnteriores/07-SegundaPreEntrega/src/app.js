
import express from 'express';
import { engine } from 'express-handlebars';
import { createServer as createHttpServer } from 'http';
//import ProductManager from './daos/filesistem/ProductManager.js';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import routerProduct from './Router/router.product.js';
import handlebars from 'handlebars';
import routerCars from './Router/router.cars.js';




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json() );
const httpServer = createHttpServer(app);

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
  
  


