import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import usersModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import cartManagerDb from "../dao/mongoDb/cartManagerDb.js";

const localStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          let user = await usersModel.findOne({ email: username });
          if (user) {
            console.log("El usuario ya existe");
            return done(null, false);
          }
          const manager = new cartManagerDb();
          let cartId = await manager.addCart();
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: cartId,
          };
          console.log(cartId);
          let result = await usersModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al obtener usuario: " + error);
        }
      }
    )
  );
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.9c666b39c39fec3d",
        clientSecret: "41eaebdaa1141cfc1fcaa316c2fc2076e9d34f40",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile._json);
          let user = await usersModel.findOne({ email: profile._json.email });
          if (!user) {
            const manager = new cartManagerDb();
            let cartId = await manager.addCart();
            let newUser = {
              first_name: profile._json.name,
              last_name: " ",
              age: 18,
              email: profile._json.email,
              password: " ",
              cart: cartId,
            };
            console.log(cartId);
            let result = await usersModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    if (user.admin === false) {
      done(null, user._id);
    } else {
      done(null, "admin");
    }
  });
  passport.deserializeUser(async (id, done) => {
    if (id === "admin") {
      let user = {
        email: "adminCoder@coder.com",
        first_name: "Administrador",
        last_name: "Coder",
        admin: true,
      };

      done(null, user);
    } else {
      let user = await usersModel.findById(id);

      done(null, user);
    }
  });

  passport.use(
    "login",
    new localStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          if (
            username === "adminCoder@coder.com" &&
            password === "adminCod3r123"
          ) {
            // Usuario Administrador
            let user = {
              email: "adminCoder@coder.com",
              first_name: "Administrador",
              last_name: "Coder",
              admin: true,
            };
            return done(null, user);
          } else {
            // Usuario normal
            let user = await usersModel.findOne({ email: username });
            if (!user) {
              console.log("Usuario inexistente");
              return done(null, false);
            }
            if (!isValidPassword(user, password)) return done(null, false);
            user.admin = false;
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
export default initializePassport;
