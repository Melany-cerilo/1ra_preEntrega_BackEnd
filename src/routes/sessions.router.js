import Express from "express";

import usersModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
const router = Express.Router();

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

//servicio que realiza el login verificando si ususario y contraseña existe
//y asignar roll de admin o usuario
router.get(
  "/api/sessions/logIn",
  passport.authenticate("login", { failureRedirect: "/logIn?failed=true" }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Credenciales invalidas" });
    req.session.email = req.user.email;
    req.session.admin = req.user.admin;
    req.session.firstName = req.user.first_name;
    req.session.lastName = req.user.last_name;
    return res.redirect("/");
  }
);
//servicio para crear un usuario desde el formulario, luego redirecciono a login
router.post(
  "/api/sessions/signIn",
  passport.authenticate("register", { failureRedirect: "/signIn?failed=true" }),
  async (req, res) => {
    res.redirect("/logIn");
  }
);

//servicio para desloguearse y destruir la sesion
router.get("/api/sessions/logOut", (req, res) => {
  if (!req.session?.email) {
    return res.redirect("/");
  }
  req.session.destroy((err) => {
    console.log("Se destruye la sesion");
    console.log(err);
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    return res.redirect("/logIn");
  });
});

router.get(
  "/api/sessions/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/api/sessions/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.email = req.user.email;
    req.session.admin = req.user.admin;
    req.session.firstName = req.user.first_name;
    req.session.lastName = req.user.last_name;
    res.redirect("/");
  }
);

//Servicio para devolver en una respuesta el usuario actual.
router.get("/api/session/current", async (req, res) => {
  if (req.session.email) {
    return res.send({
      email: req.session.email,
      admin: req.session.admin,
      firstName: req.session.first_name,
      lastName: req.session.last_name,
    });
  } else {
    return res.send({ status: "error", error: "No hay usuario logueado" });
  }
});

export default router;
