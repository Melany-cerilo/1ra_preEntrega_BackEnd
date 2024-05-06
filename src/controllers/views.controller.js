import { productService } from "../repositories/repository.config.js";
import { userService } from "../repositories/repository.config.js";
import fs from "fs";

class ViewsController {
  constructor() {
    this.userService = userService;
    this.productService = productService;
  }

  getHome = async (req, res) => {
    if (!req.session?.email) {
      return res.redirect("/logIn");
    }

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

  getCart = async (req, res) => {
    if (!req.session?.email) {
      return res.redirect("/logIn");
    }

    const user = await this.userService.getUser({ email: req.session.email });

    let cartId = user.cart;

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
      return res.redirect("/");
    }
    const user = await this.userService.getUser({ email: req.session.email });
    res.render("profile", { user: user, style: "style.css" });
  };
  modifyProduct = async (req, res) => {
    const prodId = req.params.prodId;
    const product = await this.productService.getProductById(prodId).lean();
    res.render("product", { update: true, product });
  };
  addProduct = async (req, res) => {
    res.render("product", { update: false });
  };

  loggerTest = async (req, res) => {
    try {
      const errorFile = fs.readFileSync("./errors.log", "utf8");
      res.render("loggerView", { errorFile: errorFile });
    } catch (error) {
      console.log(error);
    }
  };
}

export default ViewsController;
