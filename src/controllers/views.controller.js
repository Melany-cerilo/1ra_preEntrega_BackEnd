import ProductManagerDb from "../dao/mongoDb/productManagerDb.js";
import userService from "../dao/mongoDb/userManagerDb.js";

class ViewsController {
  constructor() {
    this.userService = new userService();
    this.productService = new ProductManagerDb();
  }

  getHome = async (req, res) => {
    //si no hay un usuario logueado, se redireccionará a login
    if (!req.session?.email) {
      return res.redirect("/logIn");
    }

    // const manager = new ProductManagerDb();
    const products = await this.productService.getProducts();

    res.render("home", { products, style: "style.css", session: req.session });
  };

  realTimeProducts = (req, res) => {
    res.render("realTimeProducts", { style: "style.css" });
  };

  getMessage = (req, res) => {
    res.render("message");
  };

  productsPaginate = (req, res) => {
    res.render("productsPaginate", { style: "style.css" });
  };

  getCart = (req, res) => {
    let cartId = req.params.cartId;
    res.render("cartView", { cartId, style: "style.css" });
  };

  logIn = (req, res) => {
    //si ya estoy logueado me redirecciona al home
    if (req.session?.email) {
      return res.redirect("/");
    }

    //si el login falla muestra "usuario y contraseña no existe " desde la vista
    let failed = false;
    if (req.query.failed) {
      failed = req.query.failed;
    }
    res.render("logIn", { failed, style: "style.css" });
  };

  signIn = (req, res) => {
    if (req.session?.email) {
      return res.redirect("/");
    }
    let failed = false;
    if (req.query.failed) {
      failed = req.query.failed;
    }
    res.render("signIn", { failed });
  };

  profile = async (req, res) => {
    if (!req.session?.email) {
      return res.redirect("/logIn");
    }

    if (req.session.admin === true) {
      //por el momento redirecciono a home ya que los datos de admin estan hardcodeados como pide la consigna.
      return res.redirect("/");
    }
    const user = await this.userService.getUser({ email: req.session.email });

    // const user = await usersModel.findOne({ email: req.session.email }).lean();
    console.log(req.session.email);
    res.render("profile", { user: user, style: "style.css" });
  };
}

export default ViewsController;
