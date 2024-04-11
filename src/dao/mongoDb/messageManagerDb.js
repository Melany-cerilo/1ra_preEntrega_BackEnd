import messageModel from "../models/message.model.js";

class messageManagerDb {
  addMessage(newAdd) {
    //Metodo para agregar un mensaje a la colección de mensajes en la DB
    try {
      return messageModel.create({
        email: newAdd.email,
        message: newAdd.message,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getMesagges() {
    //Este metodo retorna todos los mensajes almacenados en la colección de mensajes en la DB.
    try {
      return messageModel.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getMesaggesById(idMessage) {
    //Este metodo retorna el mensaje con el ID indicado por parametro.
    try {
      return messageModel.findOne({ _id: idMessage });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteMessage(idMessage) {
    //Este metodo elimina un mensaje de la colección de de mensajes en la DB
    try {
      return await messageModel.deleteOne({ _id: idMessage });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default messageManagerDb;
