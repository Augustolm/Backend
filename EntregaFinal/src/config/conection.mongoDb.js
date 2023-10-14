import mongoose from "mongoose";

//export const connectionURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.fygmuos.mongodb.net/${process.env.MONGO_DB}`;

export const connectToDatabase = async (connectionURL) => {
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
