import mongoose, { mongo } from "mongoose";

const collection = "cards";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productos",
        },
      },
    ],
    default: [],
  },
  timestamp: { type: Date, default: Date.now },
});

export const cartModel = mongoose.model(collection, cartSchema);
