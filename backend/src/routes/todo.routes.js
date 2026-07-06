import express from "express";
import { TodoController } from "../controllers/todo.controller.js";

const router = express.Router();
const controller = new TodoController();

router.get("/", controller.listTodos);
router.post("/", controller.createTodo);
router.get("/:id", controller.getTodoById);
router.patch("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);

export default router;
