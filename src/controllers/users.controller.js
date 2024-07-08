import { userService } from "../repositories/repository.config.js";
import { createHash } from "../utils.js";
import MailingService from "../services/mail/mailingService.js";

class usersController {
  constructor() {
    this.userService = userService;
  }

  makeUserPremium = async (req, res, next) => {
    let error;
    try {
      let userId = req.params.idUser;
      let user = await userService.getUserById(userId);
      if (!user) {
        error = "No se pudo obtener el usuario";
      } else {
        if (user.role === "premium") {
          error = "El usuario ya es premium";
        } else {
          if (
            !user.documents.find((doc) => doc.name === "identificacion") ||
            !user.documents.find((doc) => doc.name === "cmpdom") ||
            !user.documents.find((doc) => doc.name === "cmpedc")
          ) {
            error = "El usuario no ha terminado de procesar su documentacion";
          } else {
            const resultado = await this.userService.makeUserPremium(userId);
            if (resultado.matchedCount === 0) {
              error = "No se encontró usuario para modificar";
            } else if (resultado.modifiedCount === 0) {
              error = "No hay cambios ";
            } else if (resultado === null) {
              error = "Error de sistema";
            }
          }
        }
      }
      if (!error) {
        res.send({ status: "success", msg: "Se cambio el usuario a Premium" });
      } else {
        res.send({ status: "error", msg: error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  updatePass = async (req, res, next) => {
    try {
      let error;
      const encriptedPass = createHash(req.body.password);

      const resultado = await this.userService.updatePassword(
        req.session.email,
        encriptedPass
      );

      if (resultado.matchedCount === 0) {
        error = "No se encontró usuario para modificar";
      } else if (resultado.modifiedCount === 0) {
        error = "No hay cambios ";
      } else if (resultado === null) {
        error = "Error de sistema";
      }
      if (!error) {
        res.redirect("/");
      } else {
        res.send({ status: "error", msg: error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  saveDocuments = async (req, res, next) => {
    let error;
    let files = [];
    console.log(req.files);
    if (!req.files) {
      return res
        .status(400)
        .send({ status: "error", error: "No se pudo guardar la imagen" });
    }
    if (req.files.identificacion) {
      req.files.identificacion.forEach((file) => {
        files.push(file);
      });
    }
    if (req.files.cmpdom) {
      req.files.cmpdom.forEach((file) => {
        files.push(file);
      });
    }
    if (req.files.cmpedc) {
      req.files.cmpedc.forEach((file) => {
        files.push(file);
      });
    }
    let user = await userService.getUser({ email: req.session.email });
    if (!user) {
      error = "No se pudo actualizar el usuario";
    } else {
      //Si ya habia subido el documento, actualizo la referencia, sino creo la nueva referencia
      files.forEach((file) => {
        const docIndex = user.documents.findIndex(
          (docs) => docs.name === file.fieldname
        );
        if (docIndex != -1) {
          user.documents[docIndex].reference = file.filename;
        } else {
          user.documents.push({
            name: file.fieldname,
            reference: file.filename,
          });
        }
      });
      const result = await userService.updateUser(user._id, user);
      if (result.modifiedCount === 0) {
        error = "No se pudo actualizar imagen en usuario";
      }
    }

    if (error) {
      return res.status(400).send({ status: "error", msg: error });
    } else {
      return res.send({ status: "success", msg: "Archivos subidos" });
    }
    console.log(req.file);
  };
  getUsers = async (req, res, next) => {
    let users = await userService.getUsers();
    if (users.length > 0) {
      res.send({
        status: "success",
        msg: "Se encontraron usuarios",
        payload: users,
      });
    } else {
      let error = "No se encontraron usuarios";
      res.status(400).send({ status: "error", msg: error });
    }
  };
  deleteInactive = async (req, res, next) => {
    let userKeys = [];
    let error;
    let users = await userService.getUsers();
    if (!users) {
      error = "No se encontraron usuarios";
    } else {
      const currentDate = new Date(); //tomo fecha actual
      let inactiveUsers = users.filter((user) => {
        let diffTime = Math.abs(currentDate - user.last_connection); //saco diferencia de fechas a ms
        let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); //convierto ms a dias
        return diffDays >= 2 ? true : false;
      });
      console.log(inactiveUsers);
      if (inactiveUsers.length === 0) {
        error = "No hay usuarios inactivos";
      } else {
        let result = await userService.deleteUsers(
          inactiveUsers.map((user) => user._id)
        );
        if (result.deleteCount === 0) {
          error = "No se encontraron usuarios para eliminar";
        } else if (result === null) {
          error = "Error de sistema";
        }
        await this.sendInactiveUserMail(inactiveUsers);
      }
    }
    if (!error) {
      res.send({
        status: "success",
        msg: "Se eliminaron usuarios",
      });
    } else {
      res.status(400).send({ status: "error", msg: error });
    }
  };
  sendInactiveUserMail = async (users) => {
    await users.forEach(async (user) => {
      const mailer = new MailingService();
      const mailOptions = {
        from: "Mel ecommerce",
        to: user.email,
        subject: "Cuenta eliminada por inactividad",
        html: `
        <p>Tu cuenta ha sido eliminada por inactividad.</p>
        `,
      };
      await mailer.sendSimpleMail(mailOptions);
    });
  };
  deleteUser = async (req, res, next) => {
    let error;
    let userId = req.params.idUser;
    let user = await userService.getUserById(userId);
    if (!user) {
      error = "No se encontró el usuario para eliminar";
    } else {
      let result = await userService.deleteUsers([userId]);
      console.log(result);
      if (result.deleteCount === 0) {
        error = "No se encontró usuario para eliminar";
      } else if (result === null) {
        error = "Error de sistema";
      }
    }
    if (!error) {
      res.send({
        status: "success",
        msg: "Se eliminó el usuario",
      });
    } else {
      res.status(400).send({ status: "error", msg: error });
    }
  };
}
export default usersController;
