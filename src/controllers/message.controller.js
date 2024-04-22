import { messageService } from "../repositories/repository.config.js";
class MessageController {
  constructor() {
    this.messageService = messageService;
  }

  getMessages = async (req, res) => {
    // const manager = new messageManagerDb();
    let messages = await this.messageService.getMesagges();
    res.send({ status: "success", payload: messages });
  };

  getMesaggesById = async (req, res) => {
    // const manager = new messageManagerDb();
    let idMessage = req.params.idMessage;
    let message = await this.messageService.getMesaggesById(idMessage);
    if (!message) {
      return res.send({ status: "error", error: "No se encuentra el mensaje" });
    } else {
      res.send({ status: "success", payload: message });
    }
  };

  addMessage = async (req, res) => {
    // const manager = new messageManagerDb();

    let resultado = await this.messageService.addMessage(req.body);
    if (!resultado) {
      res.send({
        status: "error",
        msg: "No se pudo agregar tu mensaje a la DB",
      });
    } else {
      res.send({ status: "success", msg: "Mensaje agregado a la DB" });
    }
  };

  deleteMessage = async (req, res) => {
    // const manager = new messageManagerDb();
    let idMessage = req.params.idMessage;
    let error;
    let resultado = await this.messageService.deleteMessage(idMessage);
    if (resultado.deletedCount === 0) {
      error = "No se encontró mensaje para eliminar";
    } else if (resultado === null) {
      error = "Error de sistema";
    }
    if (!error) {
      res.send({ status: "success", msg: "Mensaje eliminado" });
    } else {
      res.send({ status: "error", msg: error });
    }
  };
}

export default MessageController;
