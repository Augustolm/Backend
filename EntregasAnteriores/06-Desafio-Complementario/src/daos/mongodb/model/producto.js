import mongoose from 'mongoose';

const collection = 'productos';


const productoSchema = new mongoose.Schema({


    title: { type: String, require: true, max: 100 },
    description: { type: String, require: true, max: 100 },
    price: { type: Number, require: true },
    status: { type: String, require: true, max: 100 },
    category: { type: String, require: true, max: 100 },
    thumbnail: { type: String, require: true, max: 100 },
    code: { type: Number, require: true, unique: true },
    stock: { type: Number, require: true },
    timestamp: { type: Date, default: Date.now },

});


export const productoModel = mongoose.model(collection, productoSchema);