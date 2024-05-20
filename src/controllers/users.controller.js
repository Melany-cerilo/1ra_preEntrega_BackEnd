import { userService } from "../repositories/repository.config.js";

import { createHash } from "../utils.js";
class usersController {
  constructor() {
    this.userService = userService;
  }

  makeUserPremium = async (req, res, next) => {
    try {
      let error;
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
}
export default usersController;
