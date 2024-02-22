import mongoose from "mongoose";

const cartsCollection = "carritos";

const cartsSchema = new mongoose.Schema({
  products: [{ id: { type: String }, quantity: { type: Number } }],
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
