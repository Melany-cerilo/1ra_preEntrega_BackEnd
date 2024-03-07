import Express from "express";
import usersModel from "../dao/models/user.model.js";
const router = Express.Router();

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

//servicio que realiza el login verificando si ususario y contraseña existe
//y asignar roll de admin o usuario
router.get("/api/sessions/logIn", async (req, res) => {
  const { email, password } = req.query;
  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    req.session.email = email;
    req.session.admin = true;
    req.session.firstName = "Administrador";
    req.session.lastName = "Coder";
    return res.redirect("/");
  }

  const user = await usersModel.findOne({ email: email, password: password });
  if (user) {
    req.session.email = email;
    req.session.admin = false;
    req.session.firstName = user.first_name;
    req.session.lastName = user.last_name;
    return res.redirect("/");
  } else {
    //si alguno de los campos es incorrecto. redireccionará al login con el error.
    return res.redirect("/logIn?failed=true");
  }
});
//servicio para crear un usuario desde el formulario, luego redirecciono a login
router.post("/api/sessions/signIn", (req, res) => {
  usersModel.create(req.body);
  res.redirect("/logIn");
});
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

export default router;
