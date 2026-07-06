export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function serializeTodo(todo) {
  if (!todo) return null;
  const raw = todo.toObject ? todo.toObject() : todo;
  return {
    id: raw.id || String(raw._id),
    title: raw.title,
    completed: Boolean(raw.completed),
    createdAt: raw.createdAt ? new Date(raw.createdAt).toISOString() : new Date().toISOString(),
  };
}
