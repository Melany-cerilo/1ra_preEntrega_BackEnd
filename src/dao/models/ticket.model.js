import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema(
  {
    code: { type: mongoose.Schema.Types.ObjectId, required: true },
    purchase_datetime: { type: Date, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    products: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "productos" },

        quantity: { type: Number },
      },
    ],
  },
  {
    timestamps: { createdAt: "purchase_datetime" },
  }
);

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;
