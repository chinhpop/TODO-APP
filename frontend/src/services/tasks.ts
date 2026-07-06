import axios from "axios";
import type { Task } from "../types/task";
import { normalizeTask } from "../utils/task";
import { api } from "./api.ts";

export class ApiError extends Error {
  constructor(message: string, public status?: number, public kind: "network" | "server" | "not-found" | "client" | "unknown" = "unknown") {
    super(message);
    this.name = "ApiError";
  }
}

export async function requestJson<T>(path: string, options: Record<string, unknown> = {}): Promise<T> {
  try {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      throw new ApiError("You are offline. Please check your connection.", undefined, "network");
    }

    const response = await api.request<T>({
      url: path,
      ...options,
    });

    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.error || error.message || "Request failed.";

      if (status === 404) {
        throw new ApiError(message, status, "not-found");
      }

      if (status && status >= 500) {
        throw new ApiError(message, status, "server");
      }

      if (error.code === "ERR_NETWORK" || !error.response) {
        throw new ApiError("Unable to reach the server. Please try again.", undefined, "network");
      }

      throw new ApiError(message, status, "client");
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
    data: { title },
  });
  return normalizeTask(data);
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  const data = await requestJson<Partial<Task> | Task>(`/tasks/${id}`, {
    method: 'PATCH',
    data: updates,
  });
  return normalizeTask(data);
}

export async function deleteTask(id: string): Promise<void> {
  await requestJson(`/tasks/${id}`, { method: 'DELETE' });
}
