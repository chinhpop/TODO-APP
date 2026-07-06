import { TodoService } from "../services/todo.service.js";

export class TodoController {
  constructor() {
    this.todoService = new TodoService();
  }

  createTodo = async (req, res, next) => {
    try {
      const todo = await this.todoService.createTodo(req.body);
      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  };

  listTodos = async (req, res, next) => {
    try {
      const result = await this.todoService.listTodos(req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getTodoById = async (req, res, next) => {
    try {
      const todo = await this.todoService.getTodoById(req.params.id);
      res.json(todo);
    } catch (error) {
      next(error);
    }
  };

  updateTodo = async (req, res, next) => {
    try {
      const todo = await this.todoService.updateTodo(req.params.id, req.body);
      res.json(todo);
    } catch (error) {
      next(error);
    }
  };

  deleteTodo = async (req, res, next) => {
    try {
      const todo = await this.todoService.deleteTodo(req.params.id);
      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  };
}
