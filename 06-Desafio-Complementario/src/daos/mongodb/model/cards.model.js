import mongoose, { mongo } from 'mongoose';

const collection = 'cards';


const cardSchema = new mongoose.Schema({

    products: { 
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "productos",
                }
            }
        ], 
        require: true 
        },
   
    timestamp: { type: Date, default: Date.now },


});

export const cartModel = mongoose.model(collection, cardSchema);