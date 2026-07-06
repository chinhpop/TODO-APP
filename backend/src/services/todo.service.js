import mongoose from "mongoose";
import { TodoRepository } from "../repositories/todo.repository.js";
import { AppError, serializeTodo } from "../utils/response.js";
import { MESSAGES } from "../constants/messages.js";
import { getTimeRange } from "../utils/date.js";

function isValidTodoId(id) {
  if (typeof id !== "string") return false;

  const trimmed = id.trim();
  if (!trimmed) return false;

  return mongoose.Types.ObjectId.isValid(trimmed) || /^[A-Za-z0-9_-]+$/.test(trimmed);
}

export class TodoService {
  constructor() {
    this.todoRepository = new TodoRepository();
  }

  async createTodo(input) {
    if (typeof input?.title !== "string" || !input.title.trim()) {
      throw new AppError(MESSAGES.TODO_TITLE_REQUIRED, 400);
    }

    const title = input.title.trim();
    if (title.length > 100) {
      throw new AppError(MESSAGES.TODO_TITLE_TOO_LONG, 400);
    }

    const todo = await this.todoRepository.create({ title, completed: Boolean(input.completed) });
    return serializeTodo(todo);
  }

  async listTodos(query = {}) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    const search = String(query.search || "").trim();
    const completed = query.completed === undefined ? undefined : query.completed === "true";
    const dateFilter = query.filter ? { type: query.filter, value: query.dateValue } : null;

    const result = await this.todoRepository.list({
      page,
      limit,
      search,
      completed,
      dateFilter,
      sort: query.sort || "desc",
    });

    return result.items.map(serializeTodo);
  }

  async getTodoById(id) {
    if (!isValidTodoId(id)) {
      throw new AppError(MESSAGES.TODO_INVALID_ID, 400);
    }

    const todo = await this.todoRepository.getById(id);
    if (!todo) {
      throw new AppError(MESSAGES.TODO_NOT_FOUND, 404);
    }

    return serializeTodo(todo);
  }

  async updateTodo(id, input) {
    if (!isValidTodoId(id)) {
      throw new AppError(MESSAGES.TODO_INVALID_ID, 400);
    }

    if (input?.title !== undefined) {
      if (typeof input.title !== "string") {
        throw new AppError(MESSAGES.TODO_INVALID_TITLE, 400);
      }

      if (!input.title.trim()) {
        throw new AppError(MESSAGES.TODO_TITLE_REQUIRED, 400);
      }

      if (input.title.trim().length > 100) {
        throw new AppError(MESSAGES.TODO_TITLE_TOO_LONG, 400);
      }
    }

    if (input?.completed !== undefined && typeof input.completed !== "boolean") {
      throw new AppError(MESSAGES.TODO_INVALID_COMPLETED, 400);
    }

    const patch = {};
    if (input?.title !== undefined) patch.title = input.title.trim();
    if (input?.completed !== undefined) patch.completed = input.completed;

    const todo = await this.todoRepository.updateById(id, patch);
    if (!todo) {
      throw new AppError(MESSAGES.TODO_NOT_FOUND, 404);
    }

    return serializeTodo(todo);
  }

  async deleteTodo(id) {
    if (!isValidTodoId(id)) {
      throw new AppError(MESSAGES.TODO_INVALID_ID, 400);
    }

    const todo = await this.todoRepository.deleteById(id);
    if (!todo) {
      throw new AppError(MESSAGES.TODO_NOT_FOUND, 404);
    }

    return serializeTodo(todo);
  }
}
