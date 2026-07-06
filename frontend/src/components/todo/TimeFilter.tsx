import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Clock } from "lucide-react";
import { TIME_OPTIONS } from "../../constants/tasks";
import type { TimeFilter } from "../../types/task";

export function TimeFilterDropdown({ value, onChange }: { value: TimeFilter; onChange: (v: TimeFilter) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = TIME_OPTIONS.find((o) => o.value === value)!;
  const isActive = value !== "all";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-all duration-150 focus:outline-none
          ${isActive
            ? "bg-secondary text-primary font-medium border border-primary/20"
            : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"}
        `}
      >
        <Clock size={11} className="flex-shrink-0" />
        <span>{current.label}</span>
        <ChevronDown size={10} className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute bottom-full mb-1.5 right-0 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-20 min-w-[130px]">
          <div className="px-3 py-2 border-b border-border">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Filter by Time</span>
          </div>
          {TIME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs transition-colors duration-100 flex items-center gap-2
                ${opt.value === value ? "bg-secondary text-primary font-medium" : "text-foreground hover:bg-muted"}
              `}
            >
              {opt.value === value ? <Check size={10} className="text-primary" /> : <span className="w-2.5" />}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
