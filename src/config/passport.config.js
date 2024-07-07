import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import config from "./config.js";
import { userService } from "../repositories/repository.config.js";
import { cartService } from "../repositories/repository.config.js";
import { logger } from "../logger/logger_entorno.js";
const localStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          let user = await userService.getUser({ email: username });
          if (user) {
            console.log("El usuario ya existe");
            return done(null, false);
          }
          let cartId = await cartService.addCart();
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: cartId._id.toString(),
            role: "user",
            documents: [],
          };
          logger.debug(newUser);
          let result = await userService.createUser(newUser);
          logger.debug(result);
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
        callbackURL: "/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile._json);
          let user = await userService.getUser({
            email: profile._json.email,
          });

          if (!user) {
            let cartId = await cartService.addCart();
            let newUser = {
              first_name: profile._json.name,
              last_name: " ",
              age: 18,
              email: profile._json.email,
              password: " ",
              cart: cartId,
              role: "user",
              documents: [],
            };
            logger.debug(newUser);
            let result = await userService.createUser(newUser);
            logger.debug(result);
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
    if (user.role !== "admin") {
      done(null, user._id);
    } else {
      done(null, "admin");
    }
  });
  passport.deserializeUser(async (id, done) => {
    if (id === "admin") {
      let user = {
        email: config.adminEmail,
        first_name: "Administrador",
        last_name: "Coder",
        role: "admin",
      };

      done(null, user);
    } else {
      let user = await userService.getUserById(id);

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
            username === config.adminEmail &&
            password === config.adminPassword
          ) {
            // Usuario Administrador
            let user = {
              email: config.adminEmail,
              first_name: "Administrador",
              last_name: "Coder",
              role: "admin",
            };
            return done(null, user);
          } else {
            // Usuario normal
            let user = await userService.getUser({ email: username });

            if (!user) {
              logger.info("Usuario inexistente");
              logger.debug("No se encontro el user: " + username);
              return done(null, false);
            }
            if (!isValidPassword(user, password)) return done(null, false);
            user.last_connection = new Date();
            await userService.updateUser(user._id, user);
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
