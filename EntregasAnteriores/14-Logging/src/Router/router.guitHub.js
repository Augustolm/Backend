import { Router } from "express";
import __dirname from "../app.js";
import passport from "passport";

const routerGuitHub = Router();

routerGuitHub.get(
  "/api/sessions/github",
  passport.authenticate("github", { scope: "user:email" }),
  async (req, res, next) => {}
);

routerGuitHub.get(
  "/api/session/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      rol: "user",
    };
    res.render(__dirname + "/views/profile", {
      datosUsuario: req.session?.user,
    });
  }
);

export default routerGuitHub;
