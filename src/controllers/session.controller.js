// import userManagerDb from "../dao/mongoDb/userManagerDb.js";
import CurrentDTO from "../dao/dto/current.dto.js";
import { userService } from "../repositories/repository.config.js";
import { logger } from "../logger/logger_entorno.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import MailingService from "../services/mail/mailingService.js";
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
    req.session.role = req.user.role;
    req.session.firstName = req.user.first_name;
    req.session.lastName = req.user.last_name;
    logger.info("Se loguea el usuario: " + req.session.email);
    return res.redirect("/");
  };

  signIn = async (req, res) => {
    res.redirect("/logIn");
  };

  logOut = async (req, res) => {
    if (!req.session?.role) {
      return res.redirect("/");
    }
    if (req.session.role !== "admin") {
      let user = await userService.getUser({ email: req.session.email });
      if (user) {
        user.last_connection = new Date();
        await userService.updateUser(user._id, user);
      }
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
    req.session.role = req.user.role;
    req.session.firstName = req.user.first_name;
    req.session.lastName = req.user.last_name;
    logger.info("Se loguea el usuario: " + req.session.email);
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

  restorePasswordMail = async (req, res) => {
    const email = req.body.email;
    console.log(email);

    let user = await userService.getUser({ email: email });

    if (user) {
      const token = jwt.sign({ userId: user._id }, config.secret, {
        expiresIn: "1h",
      });
      const mailer = new MailingService();
      const mailOptions = {
        from: "Mel ecommerce",
        to: user.email,
        subject: "Recuperación de contraseña",
        html: `
        <p>Por favor, haz click en el siguiente enlace para recuperar tu contraseña</p>
        <a href="/api/sessions/restorePassword/${token}"> Recuperar contraseña</a>
        `,
      };
      await mailer.sendSimpleMail(mailOptions);
      res.redirect("/");
    }
  };

  restorePassword = async (req, res) => {
    const token = req.params.token;
    console.log(token);
    const decodedToken = jwt.verify(token, config.secret);
    console.log(decodedToken);
    if (decodedToken) {
      let user = await userService.getUserById(decodedToken.userId);

      if (user) {
        req.session.email = user.email;
        return res.redirect("/restorePassword");
      }
    }
    res.redirect("/");
  };
}

export default SessionController;
