export type StatusFilter = "all" | "in-progress" | "completed";
export type TimeFilter = "all" | "week" | "month" | "year";
export type DemoView = "default" | "empty" | "loading" | "error" | "404" | "500" | "network";
export type ToastKind = "success" | "error" | "info";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface Toast {
  id: string;
  message: string;
  kind: ToastKind;
}
