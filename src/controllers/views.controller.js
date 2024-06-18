import { productService } from "../repositories/repository.config.js";
import { userService } from "../repositories/repository.config.js";
import fs from "fs";

class ViewsController {
  constructor() {
    this.userService = userService;
    this.productService = productService;
  }

  getHome = async (req, res) => {
    if (!req.session?.role) {
      return res.redirect("/logIn");
    }

    const products = await this.productService.getProducts();
    let roleText = "Usuario";
    switch (req.session.role) {
      case "admin":
        roleText = "Administrador";
        break;
      case "premium":
        roleText = "Usuario Premium";
        break;
    }
    res.render("home", {
      products,
      style: "style.css",
      session: req.session,
      admin: req.session.role === "admin" ? true : false,
      creator:
        req.session.role === "admin" || req.session.role === "premium"
          ? true
          : false,
      roleText,
    });
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
    if (!req.session?.role) {
      return res.redirect("/logIn");
    }

    const user = await this.userService.getUser({ email: req.session.email });

    let cartId = user.cart;

    res.render("cartView", { cartId, style: "style.css" });
  };

  logIn = (req, res) => {
    //si ya estoy logueado me redirecciona al home
    if (req.session?.role) {
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
    if (req.session?.role) {
      return res.redirect("/");
    }
    let failed = false;
    if (req.query.failed) {
      failed = req.query.failed;
    }
    res.render("signIn", { failed });
  };

  profile = async (req, res) => {
    if (!req.session?.role) {
      return res.redirect("/logIn");
    }

    if (req.session.role === "admin") {
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
  restorePasswordEmail = async (req, res) => {
    try {
      res.render("restorePasswordMail", { style: "style.css" });
    } catch (error) {
      console.log(error);
    }
  };
  restorePassword = async (req, res) => {
    try {
      res.render("restorePassword", { style: "style.css" });
    } catch (error) {
      console.log(error);
    }
  };
  uploadFiles = async (req, res) => {
    try {
      const user = await this.userService.getUser({ email: req.session.email });
      res.render("uploadFiles", {userId: user._id});
      

    } catch (error) {
      console.log(error);
    }
  }
}

export default ViewsController;
