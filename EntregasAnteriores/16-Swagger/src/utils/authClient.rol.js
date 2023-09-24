import __dirname from "../app.js";
import path from "path";
import userController from "../controllers/user.controller.js";

const usersController = new userController();

export async function authClient(req, res, next) {
  try {
    const { rol } = await usersController.getUserByIdController(
      req.session.passport.user
    );

    if (rol && rol.toUpperCase() === "USER") {
      return next();
    } else {
      console.log("no autorizado");
      res.redirect(403, "/unauthorized");
    }
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
}
