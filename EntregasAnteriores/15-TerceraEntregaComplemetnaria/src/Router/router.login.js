import { Router } from "express";
import __dirname from "../app.js";
import passport from "passport";
import UserDTO from "../model/userDTO.js";
import userController from "../controllers/user.controller.js";
import { generateRandomCode } from "../utils/generateCodingRestPassword.js";
import { transport } from "../utils/configCorreo.js";
import configMail from "../config/configMail.js";
import { encryptPassword } from "../utils/logicPassword.js";

const routerLogin = Router();

const usersController = new userController();

routerLogin.get("/login", async (req, res) => {
  //res.cookie("mi cookie", "mi primera cookie value", { maxAge: 10000 });
  console.log("session desde /login", req.session);
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
      return res.status(401).json({ message: info.message });
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

routerLogin.get("/login/recuperarPassword", async (req, res) => {
  try {
    const email = req.body.email;

    //const userDTO = new UserDTO(user);
    res.render(__dirname + "/views/recuperarPassowrd", {});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error al obtener la información del usuario" });
  }
});

routerLogin.post("/login/recuperarPasswordCheck", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await usersController.getUserByEmailController(email);

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const userDTO = new UserDTO(user);

    const resetCode = generateRandomCode(5);
    const resetCodeExpiration = Date.now() + 3600000; // 1 hora
    // const resetCodeExpiration = Date.now() + 60000; // 1 minuto

    req.session.email = email;
    req.session.resetCode = resetCode;
    req.session.resetCodeExpiration = resetCodeExpiration;

    const mailOption = {
      from: configMail.MAIL_USER,
      to: userDTO.email,
      subject: "Recuperar contraseña",
      text: `Su codigo de recuperacion es: ${resetCode}`,
    };

    transport.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ message: "Error al enviar el correo" });
      }
      console.log("Correo enviado");
    });

    res.status(200).send({ message: "Se le enviara un correo, con un codigo" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error al obtener la información del usuario" });
  }
});

routerLogin.post("/login/recuperarPasswordCodeCheck", async (req, res) => {
  try {
    const textCode = req.body.textCode;
    if (textCode !== req.session.resetCode) {
      return res.status(400).send({ message: "Codigo incorrecto" });
    }

    if (Date.now() > req.session.resetCodeExpiration) {
      return res.status(405).send({ message: "Codigo expirado" });
    }

    res.status(200).send({ message: "Codigo correcto" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error al obtener la información del usuario" });
  }
});

routerLogin.post("/login/restarPassword", async (req, res) => {
  try {
    const newPassword = req.body.password;
    const email = req.session.email;

    const user = await usersController.updatePasswordController(
      email,
      newPassword
    );

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    res.status(200).send({ message: "Contraseña actualizada" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error al obtener la información del usuario" });
  }
});

routerLogin.get("/api/users/premium/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const user = await usersController.getUserByIdController(uid);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.rol === "user") {
      user.rol = "premium";
    } else {
      user.rol = "user";
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

export default routerLogin;
