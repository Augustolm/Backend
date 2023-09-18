import dotenv from "dotenv";

dotenv.config();

export default {
  SERVICEMAIL: process.env.SERVICEMAIL || "gmail",
  MAIL_USER: process.env.MONGO_USER || "augustoMosettig@gmail.com",
  MAIL_PASSWORD: process.env.MONGO_PASSWORD || "utvzfjcbmpejfsgs",
};
