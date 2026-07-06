import { PAGE_SIZE } from "../../constants/tasks";
import type { StatusFilter, Task, TimeFilter } from "../../types/task";
import { StatusFilter as StatusFilterControl } from "./StatusFilter";
import { TimeFilterDropdown } from "./TimeFilter";
import { TodoItem } from "./TodoItem";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonStyles } from "../../constants/ui";
import { EmptyState, LoadingState } from "./states";

function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  const pages = Math.ceil(total / PAGE_SIZE);
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-2">
      <p className="text-xs text-muted-foreground">
        Showing {Math.min((page - 1) * PAGE_SIZE + 1, total)}–{Math.min(page * PAGE_SIZE, total)} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => onChange(page - 1)} disabled={page === 1} className={buttonStyles.icon} aria-label="Previous">
          <ChevronLeft size={15} />
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-7 h-7 rounded-lg text-xs font-medium transition-all duration-100
              ${p === page ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}
            `}
          >
            {p}
          </button>
        ))}
        <button onClick={() => onChange(page + 1)} disabled={page === pages} className={buttonStyles.icon} aria-label="Next">
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

export function TodoListPanel({
  statusFilter,
  onStatusChange,
  timeFilter,
  onTimeChange,
  tasks,
  total,
  completed,
  isFiltered,
  page,
  onPageChange,
  onToggle,
  onEdit,
  onDelete,
  isLoading,
}: {
  statusFilter: StatusFilter;
  onStatusChange: (v: StatusFilter) => void;
  timeFilter: TimeFilter;
  onTimeChange: (v: TimeFilter) => void;
  tasks: Task[];
  total: number;
  completed: number;
  isFiltered: boolean;
  page: number;
  onPageChange: (p: number) => void;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  isLoading?: boolean;
}) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="px-4 pt-3 pb-0 border-b border-border">
        <div className="flex items-center justify-between gap-3 pb-3">
          <StatusFilterControl value={statusFilter} onChange={onStatusChange} />
          {total > 0 && (
            <span className="hidden sm:block text-xs text-muted-foreground flex-shrink-0">
              {completed} of {total} completed
            </span>
          )}
        </div>
      </div>

      <div className="p-3 space-y-2">
        {isLoading ? (
          <LoadingState />
        ) : tasks.length === 0 ? (
          <EmptyState filtered={isFiltered} />
        ) : (
          tasks.map((task) => (
            <TodoItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>

      <div className="px-4 pb-4 flex items-end justify-between gap-3 flex-wrap">
        <div className="flex-1">
          <Pagination page={page} total={total} onChange={onPageChange} />
        </div>
        <div className="flex items-center gap-1.5 self-end">
          <TimeFilterDropdown value={timeFilter} onChange={onTimeChange} />
        </div>
      </div>
    </div>
  );
}
