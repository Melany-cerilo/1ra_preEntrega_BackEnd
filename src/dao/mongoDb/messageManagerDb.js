import messageModel from "../models/message.model.js";

class messageManagerDb {
  addMessage(newAdd) {
    //Metodo para agregar un mensaje a la colección de mensajes en la DB
    if (!newAdd.email || !newAdd.message) {
      return "Ingresar todos los campos.";
    }
    let resultado = messageModel.create({
      email: newAdd.email,
      message: newAdd.message,
    });
    return resultado;
  }

  getMesagges() {
    //Este metodo retorna todos los mensajes almacenados en la colección de mensajes en la DB.
    return messageModel.find();
  }

  getMesaggesById(idMessage) {
    //Este metodo retorna el mensaje con el ID indicado por parametro.
    return messageModel.findOne({ _id: idMessage });
  }

  async deleteMessage(idMessage) {
    //Este metodo elimina un mensaje de la colección de de mensajes en la DB
    const resultado = await messageModel
      .deleteOne({ _id: idMessage })
      .catch((error) => {
        console.error("Error ", error);
        return "Error ";
      });
    if (resultado.deletedCount === 0) {
      return "No se encontró mensaje para eliminar";
    }
    return;
  }
}

export default messageManagerDb;
