import type { Task } from "../types/task";
import { normalizeTask } from "../utils/task";

export class ApiError extends Error {
  constructor(message: string, public status?: number, public kind: "network" | "server" | "not-found" | "client" | "unknown" = "unknown") {
    super(message);
    this.name = "ApiError";
  }
}

export async function requestJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  try {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      throw new ApiError("You are offline. Please check your connection.", undefined, "network");
    }

    const response = await fetch(`/api${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 404) {
        throw new ApiError(data?.error || "The requested resource was not found.", response.status, "not-found");
      }

      if (response.status >= 500) {
        throw new ApiError(data?.error || "Server error.", response.status, "server");
      }

      throw new ApiError(data?.error || "Request failed.", response.status, "client");
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new ApiError("Unable to reach the server. Please try again.", undefined, "network");
    }

    throw new ApiError("Something went wrong while loading data.", undefined, "unknown");
  }
}

export async function fetchTasks(): Promise<Task[]> {
  const data = await requestJson<Partial<Task>[] | Task[]>('/tasks');
  return data.map((task) => normalizeTask(task));
}

export async function createTask(title: string): Promise<Task> {
  const data = await requestJson<Partial<Task> | Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
  return normalizeTask(data);
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  const data = await requestJson<Partial<Task> | Task>(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
  return normalizeTask(data);
}

export async function deleteTask(id: string): Promise<void> {
  await requestJson(`/tasks/${id}`, { method: 'DELETE' });
}
