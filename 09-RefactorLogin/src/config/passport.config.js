import passport from "passport";
import GithubStrategy from "passport-github2";
import { userModel } from "../daos/model/user.model.js";

export const initializePassport = () => {
  passport.use(
    "github",
    new GithubStrategy({
      clientID: "Iv1.8acbb31e21913be8",
      clientSecret: "be6affbb2e4cd93068a176f00568668aa3917352",
      callbackURL: "http://localhost:8080/api/session/githubcallback",
    }),
    async (accessToken, refreshToken, profile, done) => {
      let user = await userModel.findOne({ email: profile._jeson.email });
      if (!user) {
        let newUser = {
          first_name: profile._json.name,
          last_name: "",
          age: 0,
          email: profile._json.email,
          password: "",
          rol: "user",
        };
        let result = await userModel.create(newUser);
        done(null, result);
      }
      return done(null, user);
    }
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};
