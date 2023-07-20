import express from "express";
import { engine } from "express-handlebars";
import { createServer as createHttpServer } from "http";
import path from "path";
import routerProduct from "./Router/router.product.js";
import session from "express-session";
import routerCars from "./Router/router.card.js";
import routerLogin from "./Router/router.login.js";
import fileStore from "session-file-store";
import { fileURLToPath } from "url";
import { dirname } from "path";
import MongoStore from "connect-mongo";
import {
  connectToDatabase,
  connectionURL,
} from "./config/conection.mongoDb.js";
import { eq, isEmpty } from "./utils/utilidadesHandel.js";

//utils

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = createHttpServer(app);

//conecto a la base de datos
const conection = connectToDatabase();

//fileStore
const Filestorage = fileStore(session);

//cookies
//app.use(cookieParser());

//session
const sessionStore = new MongoStore({
  mongoUrl: connectionURL,
});

sessionStore.on("error", (error) => {
  console.error("Error en la conexión a la base de datos:", error);
});

app.use(
  session({
    store: sessionStore,
    secret: "mongoSecret",
    resave: true,
    saveUninitialized: false,
  })
);
// app.use(passaport.initialize());

// export function auth(req, res, next) {
//   if (req?.session?.user?.rol === "admin") {
//     return next();
//   } else {
//     res.render(path.join(__dirname, "views/error"), {
//       errorMessage: "Acceso no autorizado ERROR 403",
//     });
//   }
// }

//error 401 autenticacion

//error 403 faltan credenciales

// app.get('/session', async (req, res) => {
//   req.session.user = 'pepe';
//   req.session.rol = "admin";
//   req.session.visitas = req.session.visitas ? req.session.visitas + 1 : 1;
//   console.log("req.session", req.session)

//   res.send(`El isiario ${req.session.user} tiene el rol ${req.session.rol} y ha visitado la pagina ${req.session.visitas} veces`);
// })

// app.get('/distroy', async (req, res) => {
//   req.session.destroy();
//   console.log("req.session", req.session)

//   res.send(`Sesion destruida`);
// })

//roting
app.use("", routerLogin);
app.use("", routerProduct);
app.use("/api", routerCars);

app.engine(
  "handlebars",
  engine({
    extname: "handlebars",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "/views/layouts"),
    helpers: {
      eq: eq,
      isEmpty: isEmpty,
    },
  })
);
app.set("view engine", "handlebars");

httpServer.listen(8080, () => {
  console.log(`Esta escuchando el puerto ${httpServer.address().port}`);
});
