import Express from "express";
import ProductManager from "../dao/fileSystem/productManager.js";
import ProductManagerDb from "../dao/mongoDb/productManagerDb.js";
import usersModel from "../dao/models/user.model.js";
const router = Express.Router();
const pathProd = "./src/products.json";
const pathId = "./src/id.json";

//Este servicio le devuelve al home los productos  al cliente.
router.get("/", async (req, res) => {
  //si no hay un usuario logueado, se redireccionará a login
  if (!req.session?.email) {
    return res.redirect("/logIn");
  }

  const manager = new ProductManagerDb();
  const products = await manager.getProducts();

  res.render("home", { products, style: "style.css", session: req.session });
});
//este servicio devuelve al cliente una vista que actualiza sola en tiempo real los productos mediante js con websocket.
router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", { style: "style.css" });
});
//este servicio devuelve al cliente una vista con un formulario.
router.get("/message", (req, res) => {
  res.render("message");
});
//este servicio devuelve al cliente una vista con los productos.
router.get("/productsPaginate", (req, res) => {
  res.render("productsPaginate", { style: "style.css" });
});
//este servicio devuelve al cliente una vista con el carrito seleccionado y sus productos.
router.get("/cartView/:cartId", (req, res) => {
  let cartId = req.params.cartId;
  res.render("cartView", { cartId, style: "style.css" });
});
// servicio para la vista de login
router.get("/logIn", (req, res) => {
  //si ya estoy logueado me redirecciona al home
  if (req.session?.email) {
    return res.redirect("/");
  }
  //si el login falla muestra "usuario y contraseña no existe " desde la vista
  let failed = false;
  if (req.query.failed) {
    failed = req.query.failed;
  }
  res.render("logIn", { failed });
});
//servicio que devuelve la vista del formulario del registro
//si la sesion se encuentra iniciada y quiere cambiar la URL para registrarse
//se redireccionará a home
router.get("/signIn", (req, res) => {
  if (req.session?.email) {
    return res.redirect("/");
  }
  let failed = false;
  if (req.query.failed) {
    failed = req.query.failed;
  }
  res.render("signIn", { failed });
});

//servicio que devuelve la vista del perfil del usuario.
//si la sesion no esta iniciada me redireccionará a login
router.get("/profile", async (req, res) => {
  if (!req.session?.email) {
    return res.redirect("/logIn");
  }

  if (req.session.admin === true) {
    //por el momento redirecciono a home ya que los datos de admin estan hardcodeados como pide la consigna.
    return res.redirect("/");
  }
  const user = await usersModel.findOne({ email: req.session.email }).lean();
  res.render("profile", { user: user });
});
export default router;
