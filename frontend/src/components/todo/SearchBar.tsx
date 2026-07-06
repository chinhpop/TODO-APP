import { Search, X } from "lucide-react";

export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2 border border-border bg-card rounded-xl px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all duration-150">
      <Search size={15} className="text-muted-foreground flex-shrink-0" />
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/50"
      />
      {value && (
        <button onClick={() => onChange("")} className="text-muted-foreground hover:text-foreground transition-colors">
          <X size={13} />
        </button>
      )}
    </div>
  );
}
