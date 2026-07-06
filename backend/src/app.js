import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import todoRoutes from "./routes/todo.routes.js";
import { errorHandler } from "./middleware/error-handler.js";
import { env } from "./config/env.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOrigins = ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost", "http://frontend"];

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);

// API
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/tasks", todoRoutes);

// Production
if (env.nodeEnv === "production") {
  const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");

  app.use(express.static(frontendDistPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

// Error handler
app.use(errorHandler);

export default app;