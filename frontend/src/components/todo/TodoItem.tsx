import { Check, Pencil, Trash2 } from "lucide-react";
import { buttonStyles } from "../../constants/ui";
import type { Task } from "../../types/task";
import { fmtDateTime } from "../../utils/date";

export function TodoItem({ task, onToggle, onEdit, onDelete }: {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}) {
  return (
    <div className={`group flex items-start gap-3 p-4 rounded-xl border transition-all duration-150
      ${task.completed
        ? "bg-muted/40 border-border/60"
        : "bg-card border-border hover:border-primary/30 hover:shadow-sm"}
    `}>
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark in progress" : "Mark completed"}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 transition-all duration-150 flex items-center justify-center
          ${task.completed
            ? "bg-emerald-500 border-emerald-500"
            : "border-border hover:border-primary"}
        `}
      >
        {task.completed && <Check size={11} strokeWidth={3} className="text-white" />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm leading-relaxed transition-all duration-150 ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
          {task.title}
        </p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1.5">
          <span className="text-xs text-muted-foreground/70 tabular-nums">
            Created {fmtDateTime(task.createdAt)}
          </span>
          {task.completed && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              <Check size={9} strokeWidth={3} /> Completed
            </span>
          )}
          {!task.completed && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">
              In Progress
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
        <button onClick={() => onEdit(task)} aria-label="Edit task" className={buttonStyles.icon} title="Edit">
          <Pencil size={14} />
        </button>
        <button onClick={() => onDelete(task)} aria-label="Delete task" className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground transition-all duration-150 hover:bg-rose-50 hover:text-destructive active:scale-[.95]" title="Delete">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
