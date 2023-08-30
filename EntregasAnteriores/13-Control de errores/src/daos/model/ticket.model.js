import mongoose from "mongoose";

const collection = "Ticket";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productos",
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

export const ticketModel = mongoose.model(collection, ticketSchema);
