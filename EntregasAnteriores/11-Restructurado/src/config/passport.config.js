import passport from "passport";
import GithubStrategy from "passport-github2";
import { userModel } from "../daos/model/user.model.js";
import { comparePasswords, encryptPassword } from "../utils/logicPassword.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { cartModel } from "../daos/model/carts.model.js";
import { PRIVATE_KEY, cookieExtractor } from "../utils/jwt.js";

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
        try {
          let user = await userModel.findOne({ email: profile._json.email });
          if (!user) {
            const newCart = await cartModel.create({
              products: [],
              timestamp: Date.now(),
            });
            let newUser = {
              first_name: profile.username,
              last_name: "test",
              age: 0,
              email: "conexionGuitHub@guithub.com",
              password: "test",
              rol: "user",
              cart: newCart._id,
            };
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
          console.log("user", user);
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

          const newCart = await cartModel.create({
            products: [],
            timestamp: Date.now(),
          });

          const hashedPassword = await encryptPassword(password);

          const newUser = await userModel.create({
            first_name: req.body.usuario,
            last_name: req.body.lastName,
            email: email,
            age: req.body.age,
            password: hashedPassword,
            rol: "user",
            cart: newCart._id,
          });

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  const jwtOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: PRIVATE_KEY,
  };

  passport.use(
    "jwt",
    new JwtStrategy(jwtOptions, async (payload, done) => {
      console.log("payload", payload);
      try {
        const user = await userModel.findOne({ email: payload.email });
        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.serializeUser((user, done) => {
    console.log("Serializando usuario:", user._id);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("Deserializando usuario:", id);
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
