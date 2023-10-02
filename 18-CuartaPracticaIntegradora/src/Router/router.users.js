import { Router } from "express";
import path from "path";
import fs from "fs";
import { upload } from "../controllers/multer.controller.js";
import userController from "../controllers/user.controller.js";
import { __dirname } from "../app.js";

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
    console.log("filteredFiles", filteredFiles);

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

export default routerUsers;
