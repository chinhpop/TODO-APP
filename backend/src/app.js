import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/tasks", todoRoutes);
app.use(errorHandler);

export default app;
