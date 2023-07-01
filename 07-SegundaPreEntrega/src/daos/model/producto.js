import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'productos';

const productoSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  status: { type: String, required: true, max: 100 },
  category: { type: String, ref: 'category', required: true, max: 100 },
  thumbnail: { type: String, required: true, max: 100 },
  code: { type: Number, required: true, unique: true },
  stock: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

productoSchema.plugin(mongoosePaginate);

export const productoModel = mongoose.model(collection, productoSchema);
