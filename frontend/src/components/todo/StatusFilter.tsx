import { STATUS_OPTIONS } from "../../constants/tasks";
import type { StatusFilter } from "../../types/task";

export function StatusFilter({ value, onChange }: { value: StatusFilter; onChange: (v: StatusFilter) => void }) {
  return (
    <div className="flex items-center gap-0.5 bg-muted rounded-xl p-1" role="group" aria-label="Status filter">
      {STATUS_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap
            ${value === opt.value
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"}
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
