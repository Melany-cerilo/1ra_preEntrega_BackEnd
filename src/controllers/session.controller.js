// import userManagerDb from "../dao/mongoDb/userManagerDb.js";
import CurrentDTO from "../dao/dto/current.dto.js";
import { userService } from "../repositories/repository.config.js";
class SessionController {
  constructor() {
    this.userService = userService;
  }
  login = async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Credenciales invalidas" });
    req.session.email = req.user.email;
    req.session.admin = req.user.admin;
    req.session.firstName = req.user.first_name;
    req.session.lastName = req.user.last_name;
    return res.redirect("/");
  };

  signIn = async (req, res) => {
    res.redirect("/logIn");
  };

  logOut = (req, res) => {
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
  };

  github = async (req, res) => {};

  githubCallback = async (req, res) => {
    req.session.email = req.user.email;
    req.session.admin = req.user.admin;
    req.session.firstName = req.user.first_name;
    req.session.lastName = req.user.last_name;
    res.redirect("/");
  };

  current = async (req, res) => {
    if (req.session.email) {
      return res.send(
        new CurrentDTO(
          await this.userService.getUser({ email: req.session.email })
        )
      );
    } else {
      return res.send({ status: "error", error: "No hay usuario logueado" });
    }
  };
}

export default SessionController;
