import { Router } from "express";
import __dirname from "../app.js";
import { userModel } from "../daos/model/user.model.js";
import { validateEmail } from "../utils/valdiateEmail.js";
import { comparePasswords, encryptPassword } from "../utils/logicPassword.js";
import passport from "passport";

const routerLogin = Router();

routerLogin.get("/login", async (req, res) => {
  res.cookie("mi cookie", "mi primera cookie value", { maxAge: 10000 });
  res.render(__dirname + "/views/login");
});

// routerLogin.post("/login/register", async (req, res) => {
//   try {
//     const { usuario, lastName, password, email, age } = req.body;
//     const exist = await userModel.findOne({ email });

//     if (exist) {
//       return res.status(400).send({ message: "El usuario ya existe" });
//     }

//     const validateRespuesta = validateEmail(email);

//     const hashedPassword = await encryptPassword(password);
//     console.log("hashedPassword", hashedPassword);

//     const newUser = await userModel.create({
//       first_name: usuario,
//       last_name: lastName,
//       email: email,
//       age: age,
//       password: hashedPassword,
//       rol: validateRespuesta ? "admin" : "user",
//     });

//     req.session.user = {
//       name: usuario,
//       apellido: lastName,
//       email: email,
//       age: age,
//       rol: validateRespuesta ? "admin" : "user",
//     };

//     req.session.nuevoUser = true;

//     res.status(200).send({ message: "Usuario creado correctamente" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Error al crear el usuario" });
//   }
// });

routerLogin.post(
  "/login/register",
  passport.authenticate("register", {
    successRedirect: "/login/profile",
    failureRedirect: "/login",
  })
);

routerLogin.get("/login/profile", async (req, res) => {
  try {
    const userId = req.session.passport.user;
    const user = await userModel.findById(userId);
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
});

// routerLogin.post("/login/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userModel.findOne({ email: email });

//     if (!user) {
//       return res
//         .status(400)
//         .send({ message: "Usuario o contraseña incorrectos" });
//     }
//     console.log("user", user);
//     const passwordMatch = await comparePasswords(password, user.password);
//     console.log("passwordMatch", passwordMatch);
//     if (!passwordMatch) {
//       return res
//         .status(400)
//         .send({ message: "Usuario o contraseña incorrectos" });
//     }

//     req.session.user = {
//       name: user.first_name,
//       apellido: user.last_name,
//       email: user.email,
//       age: user.age,
//       rol: user.rol,
//     };

//     res.status(200).send({ message: "Usuario logueado correctamente" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Error al intentar loguear" });
//   }
// });

routerLogin.post(
  "/login/login",
  passport.authenticate("login", {
    successRedirect: "/login/profile",
    failureRedirect: "/login",
  })
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

// routerLogin.get('/login2', async (req, res) => {
//     console.log("req.cookies", req.cookies)
//     res.send("reading cookies")
//   }
// );

// routerLogin.get('/login3', async (req, res) => {
//     console.log("req.cookies", req.cookies)
//     res.clearCookie('mi cookie');
//     res.send("eliminar cookies")
//   }
// );

export default routerLogin;
