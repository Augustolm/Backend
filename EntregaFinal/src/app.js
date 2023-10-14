import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { Command } from "commander";
import { engine } from "express-handlebars";
import { createServer as createHttpServer } from "http";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import routerProduct from "./Router/router.product.js";
import routerUsers from "./Router/router.users.js";
import routerCars from "./Router/router.cars.js";
import routerLogin from "./Router/router.login.js";
import routerErrors from "./Router/router.erros.js";
import fileStore from "session-file-store";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { connectToDatabase } from "./config/conection.mongoDb.js";
import MongoStore from "connect-mongo";
import { eq, isEmpty } from "./utils/utilidadesHandel.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import routerGuitHub from "./Router/router.guitHub.js";
import routerMocks from "./Router/router.mocks.js";
import { addLogger } from "./utils/logger.config.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import routerPayment from "./Router/router.payment.js";

const program = new Command();

program.option("--mode <mode>", "mode en el que se levanta en app", "dev");
program.parse();
console.log(program.opts());
const mode = program.opts().mode;

//utils

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export { __dirname };

export const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = createHttpServer(app);

//conecto a la base de datos
const conectionDB = connectToDatabase(process.env.CONEXTURLMONGO);

//fileStore
const Filestorage = fileStore(session);

//passportGuitHub
initializePassport();

//cookies
app.use(cookieParser());

//winston
app.use(addLogger);

//session
const sessionStore = new MongoStore({
  mongoUrl: process.env.CONEXTURLMONGO,
});

sessionStore.on("error", (error) => {
  console.error("Error en la conexión a la base de datos:", error);
});

app.use(
  session({
    store: sessionStore,
    secret: "mongoSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000, //24 horas
    },
  })
);

app.use(passport.initialize());

//roting
app.use("", routerLogin);
app.use("", routerGuitHub);
app.use("", routerProduct);
app.use("/api", routerCars);
app.use("/api", routerUsers);
app.use("", routerErrors);
app.use("", routerMocks);
app.use("", routerPayment);

//Ruta Swagger

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Carrito de copmpras!",
      description: "Documentacion de carrito de compra CoderHouse",
      contact: {
        name: "Mosettig Augusto",
      },
      info: {
        version: "1.0.0",
        title: "Carrito de compra CoderHouse",
        description: "Documentacion de carrito de compra CoderHouse",
      },
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

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
