import mongoose from 'mongoose';

const collection = 'messages';


const chatSchema = new mongoose.Schema({

    user: { type: String, require: true, max: 100},
    email: { type: String, require: true, max: 100},
    message: { type: String, require: true, max: 100},
});


export const chatModel = mongoose.model(collection, chatSchema);