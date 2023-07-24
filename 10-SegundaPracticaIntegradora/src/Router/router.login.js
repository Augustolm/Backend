import { Router } from "express";
import __dirname from "../app.js";
import { userModel } from "../daos/model/user.model.js";
import { validateEmail } from "../utils/valdiateEmail.js";
import { comparePasswords, encryptPassword } from "../utils/logicPassword.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../utils/jwt.js";

const routerLogin = Router();

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
// routerLogin.get("/login/profile", async (req, res) => {
//   console.log("req", req);
//   try {
//     const userId = req.session.passport.user;
//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.status(404).send({ message: "Usuario no encontrado" });
//     }
//     const { first_name, last_name, email, age } = user;
//     res.render(__dirname + "/views/profile", {
//       datosUsuario: { first_name, last_name, email, age },
//       isNewUser: req.session.nuevoUser,
//     });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .send({ message: "Error al obtener la información del usuario" });
//   }
// });

routerLogin.get(
  "/login/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("no llego aca!");
    try {
      const user = req.user;
      console.log("user desde profile", user);

      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }

      const { first_name, last_name, email, age } = user;
      res.render(__dirname + "/views/profile", {
        datosUsuario: { first_name, last_name, email, age },
        isNewUser: req.session.nuevoUser,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error al obtener la información del usuario" });
    }
  }
);

//login con session
// routerLogin.post(
//   "/login/login",
//   passport.authenticate("login", {
//     successRedirect: "/login/profile",
//     failureRedirect: "/login",
//   })
// );

//login con jwt
routerLogin.post("/login/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .send({ status: "error", message: "Usuario o contraseña incorrectos" });
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .send({ status: "error", message: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign({ email }, PRIVATE_KEY, { expiresIn: "1h" });

    res.cookie("jwt", token, { httpOnly: true }).send({ status: "success" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).send({ status: "error", message: "Error en el servidor" });
  }
});

routerLogin.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // no lo imprimi en ningun lado.. pero lo dejo por si lo necesito
    res.json({ user: req.user });
  }
);

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
