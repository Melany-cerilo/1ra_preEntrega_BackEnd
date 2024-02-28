import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "productos";

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 200 },
  description: { type: String, required: true, max: 300 },
  price: { type: Number, required: true },
  code: { type: Number, required: true },
  stock: { type: Number, required: true, index: true },
  category: { type: String, required: true, max: 200, index: true },
  status: { type: Boolean, required: true },
});

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;
