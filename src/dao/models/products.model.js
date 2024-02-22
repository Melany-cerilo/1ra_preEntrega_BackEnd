import mongoose from "mongoose";

const productsCollection = "productos";

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 200 },
  description: { type: String, required: true, max: 300 },
  price: { type: Number, required: true },
  code: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true, max: 200 },
  status: { type: Boolean, required: true },
});

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;
