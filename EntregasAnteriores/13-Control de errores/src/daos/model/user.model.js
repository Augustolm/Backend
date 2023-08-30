import mongoose from "mongoose";

const collection = "users";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 },
  age: { type: Number, required: true },
  password: { type: String, required: true, max: 100 },
  rol: { type: String, default: "user" },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "cards" },
});

export const userModel = mongoose.model(collection, userSchema);
