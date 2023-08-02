import __dirname from "../app.js";
import path from "path";

export function auth(req, res, next) {
  if (req?.session?.user?.rol === "admin") {
    return next();
  } else {
    res.render(path.join(__dirname, "views/error"), {
      errorMessage: "Acceso no autorizado ERROR 403",
    });
  }
}
