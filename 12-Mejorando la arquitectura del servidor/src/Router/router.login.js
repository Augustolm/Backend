import { Router } from "express";
import __dirname from "../app.js";
import { userModel } from "../daos/model/user.model.js";
import passport from "passport";
import UserDTO from "../model/userDTO.js";
import userController from "../controllers/user.controller.js";

const routerLogin = Router();

const usersController = new userController();

routerLogin.get("/login", async (req, res) => {
  //res.cookie("mi cookie", "mi primera cookie value", { maxAge: 10000 });
  res.render(__dirname + "/views/login");
});

routerLogin.post(
  "/login/register",
  passport.authenticate("register", {
    successRedirect: "/login/profile",
    failureRedirect: "/login",
  })
);

//login con SESSION
routerLogin.get("/login/profile", async (req, res) => {
  try {
    const userId = req.session.passport.user;

    const user = await usersController.getUserByIdController(userId);

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    const userDTO = new UserDTO(user);

    const { first_name, last_name, email, age } = user;
    res.render(__dirname + "/views/profile", {
      datosUsuario: userDTO,
      isNewUser: req.session.nuevoUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error al obtener la información del usuario" });
  }
});

//login con session
routerLogin.post("/login/login", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/login/profile");
    });
  })(req, res, next);
});

routerLogin.post("/login/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al desloguear el usuario" });
  }
});

export default routerLogin;
