import { Router } from "express";
import { __dirname } from "../app.js";
import path from "path";

const routerErrors = Router();

routerErrors.get("/unauthorized", (req, res) => {
  res.render(path.join(__dirname, "views/error"), {
    errorMessage: "Acceso no autorizado ERROR 403",
  });
});

routerErrors.get("/faltaLogin", (req, res) => {
  res.render(path.join(__dirname, "views/error"), {
    errorMessage: "Realizar login ERROR 400",
  });
});

routerErrors.get("/ProductoError", (req, res) => {
  res.render(path.join(__dirname, "views/error"), {
    errorMessage: "No puedes comprar un producto tuyo",
  });
});

export default routerErrors;
