import Express from "express";
import MessageController from "../controllers/message.controller.js";
// import messageManagerDb from "../dao/mongoDb/messageManagerDb.js";

const router = Express.Router();
const messageController = new MessageController();

//servicio para traer todos los mensajes de la colección de mensajes de la DB
router.get("/api/message", messageController.getMessages);

//servicio para traer un mensaje un mensaje por ID
router.get("/api/message/:idMessage", messageController.getMesaggesById);
//servicio para agregar un mensaje a la colección de mensajes en la DB
router.post("/api/message", messageController.addMessage);

//servicio para eliminar un mensaje de la colección de mensajes
router.delete("/api/message/:idMessage", messageController.deleteMessage);

export default router;
