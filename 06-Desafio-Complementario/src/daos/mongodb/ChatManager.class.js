import { connectToDatabase } from "../../config/conection.Mongodb.js";
import { chatModel } from "./model/chat.model.js";



export default class ChatManager {



    async createChat(chat) {
        try {
            let result = await chatModel.create(chat);
            return result;
        } catch (error) {
            console.log("Error al crear el chat", error);
        }
    }

    async limpiarChat() {
        try {
            let result = await chatModel.deleteMany({});
            return result;
        } catch (error) {
            console.log("Error al limpiar el chat", error);
        }
    }

    async getChat() {
        try {
            let result = await chatModel.find();
            return result ? result : [];
        } catch (error) {
            console.log("Error al cargar el chat", error);
        }
    }

    


}