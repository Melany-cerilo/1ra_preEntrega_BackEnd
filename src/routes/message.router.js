import Express from "express";
import messageManagerDb from "../dao/mongoDb/messageManagerDb.js";

const router = Express.Router();

//servicio para traer todos los mensajes de la colección de mensajes de la DB
router.get("/api/message", async (req, res) => {
  const manager = new messageManagerDb();
  let messages = await manager.getMesagges();
  res.send({ result: "success", payload: messages });
});

//servicio para traer un mensaje un mensaje por ID
router.get("/api/message/:idMessage", async (req, res) => {
  const manager = new messageManagerDb();
  let idMessage = req.params.idMessage;
  let message = await manager.getMesaggesById(idMessage);
  if (!message) {
    return res.send({ error: "No se encuentra el mensaje" });
  } else {
    res.send({ message });
  }
});
//servicio para agregar un mensaje a la colección de mensajes en la DB
router.post("/api/message", async (req, res) => {
  const manager = new messageManagerDb();
  let resultado = await manager.addMessage(req.body);
  if (!resultado) {
    res.send({ msg: "No se pudo agregar tu mensaje a la DB" });
  } else {
    res.send({ msg: "Mensaje agregado a la DB" });
  }
});

//servicio para eliminar un mensaje de la colección de mensajes
router.delete("/api/message/:idMessage", async (req, res) => {
  const manager = new messageManagerDb();
  let idMessage = req.params.idMessage;
  let error = await manager.deleteMessage(idMessage);
  if (!error) {
    res.send({ msg: "Mensaje eliminado" });
  } else {
    res.send({ msg: error });
  }
});

export default router;
