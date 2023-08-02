import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_USER: process.env.MONGO_USER || "augusto",
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || "lolalola",
  MONGO_CLUSTER: process.env.MONGO_CLUSTER || "cluster0",
  MONGO_DB: process.env.MONGO_DB || "mydatabase",
  MONGO_HOST: process.env.MONGO_HOST || "localhost",
  PORT: process.env.PORT || 8080,
};
