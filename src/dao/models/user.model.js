import mongoose from "mongoose";

const usersCollection = "usuarios";

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, max: 200 },
  first_name: { type: String, required: true, max: 300 },
  last_name: { type: String, required: true, max: 300 },
  age: { type: Number, required: true, max: 100 },
  password: { type: String, required: true, max: 300 },
  cart: { type: String, ref: "carritos" },
  role: { type: String, required: true, default: "user" },
});

const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;
