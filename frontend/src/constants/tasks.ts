import type { DemoView, StatusFilter, Task, TimeFilter } from "../types/task";

export const NOW = new Date("2026-07-06T12:00:00");
export const PAGE_SIZE = 5;
export const MAX_LEN = 100;

export const SEED: Task[] = [
  { id: "1", title: "Review product roadmap and update Q3 milestones", completed: false, createdAt: new Date("2026-07-06T09:15:00") },
  { id: "2", title: "Schedule team retrospective meeting", completed: true, createdAt: new Date("2026-07-04T14:30:00") },
  { id: "3", title: "Finalize design system documentation", completed: false, createdAt: new Date("2026-07-02T11:00:00") },
  { id: "4", title: "Write unit tests for the API module", completed: false, createdAt: new Date("2026-07-05T16:45:00") },
  { id: "5", title: "Deploy hotfix to production environment", completed: true, createdAt: new Date("2026-06-28T10:20:00") },
  { id: "6", title: "Onboard new frontend engineer", completed: false, createdAt: new Date("2026-07-03T08:30:00") },
];

export const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export const TIME_OPTIONS: { value: TimeFilter; label: string }[] = [
  { value: "all", label: "All Time" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

export const DEMO_VIEWS: { id: DemoView; label: string }[] = [
  { id: "default", label: "Default" },
  { id: "empty", label: "Empty" },
  { id: "loading", label: "Loading" },
  { id: "error", label: "Error" },
  { id: "404", label: "404" },
  { id: "500", label: "500" },
  { id: "network", label: "Network" },
];
