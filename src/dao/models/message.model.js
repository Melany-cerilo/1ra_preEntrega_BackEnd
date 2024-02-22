import mongoose from "mongoose";

const messageCollection = "mensajes";

const messageSchema = new mongoose.Schema({
  email: { type: String, required: true, max: 200 },
  message: { type: String, required: true, max: 300 },
});

const messageModel = mongoose.model(messageCollection, messageSchema);

export default messageModel;
