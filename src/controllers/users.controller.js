import { userService } from "../repositories/repository.config.js";

import { createHash } from "../utils.js";
class usersController {
  constructor() {
    this.userService = userService;
  }

  makeUserPremium = async (req, res, next) => {
    let error;
    try {
      let user = await userService.getUser({ email: req.session.email });
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
            const resultado = await this.userService.makeUserPremium(
              req.params.idUser
            );
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
}
export default usersController;
