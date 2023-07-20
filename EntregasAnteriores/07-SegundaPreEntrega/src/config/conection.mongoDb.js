import mongoose from "mongoose";

const connectionURL = 'mongodb+srv://augusto:lolalola@cluster0.fygmuos.mongodb.net/';

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