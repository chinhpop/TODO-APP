import type { Task } from "../types/task";

let _id = 100;

export function uid() {
  return String(++_id);
}

export function normalizeTask(task: Partial<Task> & { createdAt?: string | Date }) {
  return {
    id: task.id ?? "",
    title: task.title ?? "",
    completed: Boolean(task.completed),
    createdAt: task.createdAt instanceof Date ? task.createdAt : new Date(task.createdAt ?? Date.now()),
  } satisfies Task;
}
