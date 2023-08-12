import __dirname from "../app.js";
import path from "path";
import userController from "../controllers/user.controller.js";

const usersController = new userController();

export async function auth(req, res, next) {
  try {
    const { rol } = await usersController.getUserByIdController(
      req.session.passport.user
    );

    if (rol && rol.toUpperCase() === "ADMIN") {
      return next();
    } else {
      res.render(path.join(__dirname, "views/error"), {
        errorMessage: "Acceso no autorizado ERROR 403",
      });
    }
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
}
