import { CheckSquare } from "lucide-react";

function StatPill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${color}`}>
      <span className="font-bold">{value}</span>
      <span className="opacity-70">{label}</span>
    </span>
  );
}

export function Header({ total, completed, pending }: { total: number; completed: number; pending: number }) {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <CheckSquare size={18} className="text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground text-base tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Todo Management
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1">
            <StatPill label="Total" value={total} color="text-foreground bg-muted" />
            <StatPill label="Completed" value={completed} color="text-emerald-700 bg-emerald-50" />
            <StatPill label="Pending" value={pending} color="text-amber-700 bg-amber-50" />
          </div>

          <div className="sm:hidden flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{total}</span> tasks
          </div>
        </div>

        <div className="sm:hidden flex gap-2 pb-3">
          <StatPill label="Total" value={total} color="text-foreground bg-muted" />
          <StatPill label="Completed" value={completed} color="text-emerald-700 bg-emerald-50" />
          <StatPill label="Pending" value={pending} color="text-amber-700 bg-amber-50" />
        </div>
      </div>
    </header>
  );
}
