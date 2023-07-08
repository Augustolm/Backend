import passport from "passport";
import GithubStrategy from "passport-github2";
import { userModel } from "../daos/model/user.model.js";
import { comparePasswords, encryptPassword } from "../utils/logicPassword.js";
import { Strategy as LocalStrategy } from "passport-local";

export const initializePassport = () => {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.8acbb31e21913be8",
        clientSecret: "be6affbb2e4cd93068a176f00568668aa3917352",
        callbackURL: "http://localhost:8080/api/session/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("profile", profile);
        try {
          let user = await userModel.findOne({ email: profile._json.email });
          if (!user) {
            let newUser = {
              first_name: profile.username,
              last_name: "test",
              age: 0,
              email: "conexionGuitHub@guithub.com",
              password: "test",
              rol: "user",
            };
            console.log("newUser", newUser);
            let result = await userModel.create(newUser);
            return done(null, result);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });

          if (!user) {
            return done(null, false, {
              message: "Usuario o contraseña incorrectos",
            });
          }

          const passwordMatch = await comparePasswords(password, user.password);

          if (!passwordMatch) {
            return done(null, false, {
              message: "Usuario o contraseña incorrectos",
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const exist = await userModel.findOne({ email });

          if (exist) {
            return done(null, false, { message: "El usuario ya existe" });
          }

          const hashedPassword = await encryptPassword(password);

          const newUser = await userModel.create({
            first_name: req.body.usuario,
            last_name: req.body.lastName,
            email: email,
            age: req.body.age,
            password: hashedPassword,
            rol: "user",
          });

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
