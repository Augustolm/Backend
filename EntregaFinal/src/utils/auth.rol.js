import { __dirname } from "../app.js";
import path from "path";
import userController from "../controllers/user.controller.js";
import CustomError from "../services/Error/CustomError.js";
import { EErrors } from "../services/Error/enums.js";

const usersController = new userController();

export async function auth(req, res, next) {
  try {
    if (!req?.session?.passport?.user) {
      res.render(path.join(__dirname, "views/error"), {
        errorMessage: "Acceso no autorizado ERROR 401",
      });
      return;
    }

    const { rol } = await usersController.getUserByIdController(
      req?.session?.passport?.user
    );

    if (
      (rol && rol.toUpperCase() === "ADMIN") ||
      rol.toUpperCase() === "PREMIUM"
    ) {
      return next();
    } else {
      res.render(path.join(__dirname, "views/error"), {
        errorMessage: "Acceso no autorizado ERROR 405",
      });
    }
  } catch (error) {
    throw CustomError.crearError({
      name: "ValidateUserauthError",
      mensaje: "Usuario rol, no proporcionado",
      codigo: EErrors.INVALID_CREDENTIALS,
      cause: error,
    });
  }
}
