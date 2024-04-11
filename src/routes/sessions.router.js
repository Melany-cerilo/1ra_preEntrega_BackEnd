import Express from "express";
import SessionController from "../controllers/session.controller.js";
import passport from "passport";
const router = Express.Router();

const sessionController = new SessionController();

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

//servicio que realiza el login verificando si ususario y contraseña existe
//y asignar roll de admin o usuario
router.get(
  "/api/sessions/logIn",
  passport.authenticate("login", { failureRedirect: "/logIn?failed=true" }),
  sessionController.login
);
//servicio para crear un usuario desde el formulario, luego redirecciono a login
router.post(
  "/api/sessions/signIn",
  passport.authenticate("register", { failureRedirect: "/signIn?failed=true" }),
  sessionController.signIn
);

//servicio para desloguearse y destruir la sesion
router.get("/api/sessions/logOut", sessionController.logOut);

router.get(
  "/api/sessions/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  sessionController.github
);

router.get(
  "/api/sessions/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  sessionController.githubCallback
);

//Servicio para devolver en una respuesta el usuario actual.
router.get("/api/session/current", sessionController.current);

export default router;
