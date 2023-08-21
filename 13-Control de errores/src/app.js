import express from "express";
import { engine } from "express-handlebars";
import { createServer as createHttpServer } from "http";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import routerProduct from "./Router/router.product.js";
import routerCars from "./Router/router.cars.js";
import routerLogin from "./Router/router.login.js";
import routerErrors from "./Router/router.erros.js";
import fileStore from "session-file-store";
import { fileURLToPath } from "url";
import { dirname } from "path";
import MongoStore from "connect-mongo";
import {
  connectToDatabase,
  connectionURL,
} from "./config/conection.mongoDb.js";
import { eq, isEmpty } from "./utils/utilidadesHandel.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import routerGuitHub from "./Router/router.guitHub.js";
import { Command } from "commander";
import dotenv from "dotenv";
import routerMocks from "./Router/router.mocks.js";

const program = new Command();

program.option("--mode <mode>", "mode en el que se levanta en app", "dev");

program.parse();

console.log(program.opts());

const mode = program.opts().mode;

dotenv.config({
  path: mode === "dev" ? "./.env.development" : "./.env.production",
});

console.log("porsess", process.env.PORT);
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

//passportGuitHub
initializePassport();

//cookies
app.use(cookieParser());

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

app.use(passport.initialize());

//roting
app.use("", routerLogin);
app.use("", routerGuitHub);
app.use("", routerProduct);
app.use("/api", routerCars);
app.use("", routerErrors);
app.use("", routerMocks);

//engine
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

httpServer.listen(process.env.PORT, () => {
  console.log(`Esta escuchando el puerto ${httpServer.address().port}`);
});
