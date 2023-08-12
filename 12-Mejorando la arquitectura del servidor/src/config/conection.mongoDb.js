import config from "./config.js";
import mongoose from "mongoose";

const { MONGO_USER, MONGO_CLUSTER, MONGO_DB, MONGO_PASSWORD } = config;

export const connectionURL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.fygmuos.mongodb.net/${MONGO_DB}`;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión exitosa a la base de datos de MongoDB");
  } catch (error) {
    console.error("Error al conectar a la base de datos de MongoDB", error);
  }
};
