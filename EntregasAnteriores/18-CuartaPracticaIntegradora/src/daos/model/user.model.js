import mongoose from "mongoose";

const collection = "users";

const documentSchema = new mongoose.Schema({
  name: { type: String },
  reference: { type: String },
});

const connectionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  action: { type: String, enum: ["login", "logout"], required: true },
});

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 },
  age: { type: Number, required: true },
  password: { type: String, required: true, max: 100 },
  rol: { type: String, default: "user" },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "cards" },
  document: [documentSchema],
  last_connection: [connectionSchema],
});

export const userModel = mongoose.model(collection, userSchema);
