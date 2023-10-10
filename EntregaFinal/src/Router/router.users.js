import { Router } from "express";
import path from "path";
import fs from "fs";
import { upload } from "../controllers/multer.controller.js";
import userController from "../controllers/user.controller.js";
import { __dirname } from "../app.js";
import UserDTO from "../model/userDTO.js";
import configMail from "../config/configMail.js";
import { transport } from "../utils/configCorreo.js";

const routerUsers = Router();
let usersController = new userController();

const documentsPath = path.join(process.cwd(), "uploads", "documents");

// Lista de nombres de archivos que se deben verificar
const requiredDocuments = [
  "Identificacion.pdf",
  "Comprobante de domicilio.pdf",
  "Comprobante de estado de cuenta.pdf",
];

const filesInDocuments = fs.readdirSync(documentsPath);

routerUsers.post("/users/premium/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const user = await usersController.getUserByIdController(uid);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const filteredFiles = filesInDocuments.filter((fileName) => {
      return fileName.startsWith(uid + "-");
    });

    const documentsExist = requiredDocuments.every((doc) =>
      filteredFiles.some((fileName) => fileName.includes(doc))
    );

    if (user.rol === "user" && documentsExist) {
      user.rol = "premium";
    } else {
      return res.status(200).json({
        message:
          "El usuario no tiene los documentos requeridos para poder ser Admin",
      });
    }

    await usersController.updateUserController(uid, user);

    return res
      .status(200)
      .json({ message: "Rol de usuario actualizado con éxito", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

routerUsers.post("/users/premium2/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const user = await usersController.getUserByIdController(uid);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.rol === "user") {
      user.rol = "premium";
    }

    await usersController.updateUserController(uid, user);

    return res
      .status(200)
      .json({ message: "Rol de usuario actualizado con éxito", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

routerUsers.post(
  "/users/:uid/documents",
  async (req, res, next) => {
    try {
      const { uid } = req.params;
      const user = await usersController.getUserByIdController(uid);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (!req.body.multer) {
        req.body.multer = {};
      }
      req.body.multer.userId = uid;

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  },
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "productImage", maxCount: 1 },
    { name: "document" },
  ]),
  (req, res) => {
    const { uid } = req?.params;
    const userId = req.body.multer?.userId;

    res.send("Archivos subidos correctamente");
  }
);

routerUsers.get("/users", async (req, res) => {
  try {
    const users = await usersController.getUsersController();
    const userDTO = users.map((user) => new UserDTO(user));

    return res.status(200).json(userDTO);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

routerUsers.get("/login/delete", async (req, res) => {
  try {
    const users = await usersController.getUserLoginOnController();
    const errors = [];
    const correosEliminados = [];

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay usuarios conectados con limite de timepo" });
    }
    for (const user of users) {
      correosEliminados.push(user.email);
      const mailOption = {
        from: configMail.MAIL_USER,
        to: user.email,
        subject: "Inactividad de cuenta",
        text: `
        Estimado ${user.first_name} ${user.last_name}: su cuenta se encuentra eliminada por falta de actividad
        `,
      };

      transport.sendMail(mailOption, (error, info) => {
        if (error) {
          console.log(error);
          errors.push({ user: user.email, error });
        }

        if (!result) {
          errors.push({ user: user.email, error });
        }
      });
      const result = await usersController.deleteUserController(user._id);
    }
    if (errors.length > 0) {
      return res
        .status(500)
        .send({ message: "Error al enviar algunos correos", errors });
    }
    res.status(200).send({ message: `Correos enviados`, correosEliminados });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "Error al procesar la solicitud" });
  }
});

routerUsers.get("/gestion/users", async (req, res) => {
  try {
    const users = await usersController.getUsersController();
    const userDTO = users.map((user) => new UserDTO(user));

    console.log("userDTO", userDTO);

    res.render(__dirname + "/views/gestionUsuario", { userDTO });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default routerUsers;
