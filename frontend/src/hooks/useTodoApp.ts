import { useCallback, useEffect, useMemo, useState } from "react";
import { NOW, PAGE_SIZE } from "../constants/tasks";
import type { StatusFilter, Task, TimeFilter, Toast, ToastKind } from "../types/task";
import { isThisMonth, isThisWeek, isThisYear } from "../utils/date";
import { uid } from "../utils/task";
import { ApiError, createTask, deleteTask, fetchTasks, updateTask } from "../services/tasks";

type LoadViewState = "loading" | "ready" | "network" | "server" | "error" | "not-found";

export function useTodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [page, setPage] = useState(1);
  const [formLoading, setFormLoading] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [uiState, setUiState] = useState<LoadViewState>("loading");

  const toast = useCallback((message: string, kind: ToastKind = "success") => {
    const id = uid();
    setToasts((prev) => [...prev, { id, message, kind }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const loadTasks = useCallback(async () => {
    setIsLoadingTasks(true);
    setLoadError(null);
    setUiState("loading");

    try {
      const data = await fetchTasks();
      setTasks(data);
      setLoadError(null);
      setUiState("ready");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load tasks.";
      setLoadError(message);

      if (error instanceof ApiError) {
        if (error.kind === "network") {
          setUiState("network");
        } else if (error.kind === "server") {
          setUiState("server");
        } else if (error.kind === "not-found") {
          setUiState("not-found");
        } else {
          setUiState("error");
        }
      } else {
        setUiState("error");
      }

      toast(message, "error");
    } finally {
      setIsLoadingTasks(false);
    }
  }, [toast]);

  useEffect(() => {
    let cancelled = false;

    async function runLoad() {
      try {
        await loadTasks();
      } finally {
        if (!cancelled) {
          setIsLoadingTasks(false);
        }
      }
    }

    void runLoad();
    return () => {
      cancelled = true;
    };
  }, [loadTasks]);

  useEffect(() => {
    setPage(1);
  }, [query, statusFilter, timeFilter]);

  async function handleAdd(title: string) {
    setFormLoading(true);
    try {
      const task = await createTask(title);
      setTasks((prev) => [task, ...prev]);
      setPage(1);
      toast("Task created successfully.");
    } catch (error) {
      toast(error instanceof Error ? error.message : "Unable to create task.", "error");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleUpdate(id: string, title: string) {
    setFormLoading(true);
    try {
      const task = await updateTask(id, { title });
      setTasks((prev) => prev.map((t) => (t.id === id ? task : t)));
      setEditingTask(null);
      toast("Task updated successfully.");
    } catch (error) {
      toast(error instanceof Error ? error.message : "Unable to update task.", "error");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleToggle(id: string) {
    const currentTask = tasks.find((t) => t.id === id);
    if (!currentTask) return;

    const nextCompleted = !currentTask.completed;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: nextCompleted } : t)));

    try {
      await updateTask(id, { completed: nextCompleted });
    } catch (error) {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: currentTask.completed } : t)));
      toast(error instanceof Error ? error.message : "Unable to update task.", "error");
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;

    const target = deleteTarget;
    setTasks((prev) => prev.filter((t) => t.id !== target.id));

    try {
      await deleteTask(target.id);
      toast("Task deleted successfully.", "info");
      setDeleteTarget(null);
    } catch (error) {
      setTasks((prev) => [target, ...prev]);
      toast(error instanceof Error ? error.message : "Unable to delete task.", "error");
    }
  }

  const counts = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  }), [tasks]);

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || task.title.toLowerCase().includes(q);
      const matchS = statusFilter === "all" || (statusFilter === "completed" ? task.completed : !task.completed);
      const matchT = timeFilter === "all"
        || (timeFilter === "week" ? isThisWeek(task.createdAt, NOW)
          : timeFilter === "month" ? isThisMonth(task.createdAt, NOW)
          : isThisYear(task.createdAt, NOW));
      return matchQ && matchS && matchT;
    });
  }, [tasks, query, statusFilter, timeFilter]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [filtered.length, page]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const isFiltered = query.trim() !== "" || statusFilter !== "all" || timeFilter !== "all";
  const isInitialLoading = isLoadingTasks && tasks.length === 0 && uiState === "loading";

  return {
    tasks,
    query,
    statusFilter,
    timeFilter,
    editingTask,
    deleteTarget,
    toasts,
    page,
    formLoading,
    isLoadingTasks,
    loadError,
    uiState,
    counts,
    filtered,
    paginated,
    isFiltered,
    isInitialLoading,
    setQuery,
    setStatusFilter,
    setTimeFilter,
    setEditingTask,
    setDeleteTarget,
    setPage,
    toast,
    retryLoadTasks: loadTasks,
    dismissToast,
    handleAdd,
    handleUpdate,
    handleToggle,
    handleDeleteConfirm,
  };
}
