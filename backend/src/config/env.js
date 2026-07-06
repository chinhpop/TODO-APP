import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5001),
  mongoUrl: process.env.MONGO_URL?.trim() || "mongodb://127.0.0.1:27017/todo-app",
};
