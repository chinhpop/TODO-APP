import { AlertCircle, Check, Plus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { MAX_LEN } from "../../constants/tasks";
import { buttonStyles } from "../../constants/ui";
import type { Task } from "../../types/task";
import { Spinner } from "../common/Spinner";

export function TodoForm({ editTask, onAdd, onUpdate, onCancel, isLoading }: {
  editTask: Task | null;
  onAdd: (title: string) => void;
  onUpdate: (id: string, title: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [value, setValue] = useState(editTask?.title ?? "");
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isEditing = Boolean(editTask);

  useEffect(() => {
    setValue(editTask?.title ?? "");
    setTouched(false);
    if (editTask) inputRef.current?.focus();
  }, [editTask]);

  useEffect(() => {
    if (!editTask) inputRef.current?.focus();
  }, [editTask]);

  const error = useMemo(() => {
    if (!touched) return null;
    if (!value.trim()) return "Task name is required.";
    if (value.trim().length > MAX_LEN) return `Task name cannot exceed ${MAX_LEN} characters.`;
    return null;
  }, [value, touched]);

  const charCount = value.length;
  const isOverLimit = charCount > MAX_LEN;

  function handleCancel() {
    setValue("");
    setTouched(false);
    onCancel();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!value.trim() || isOverLimit) return;

    if (isEditing && editTask) {
      onUpdate(editTask.id, value.trim());
      return;
    }

    onAdd(value.trim());
    setValue("");
    setTouched(false);
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {editTask ? "Edit Task" : "Add New Task"}
      </h2>
      <form key={editTask?.id ?? "new-task"} onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <div className={`flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-all duration-150 bg-background
            ${error ? "border-destructive ring-2 ring-destructive/15" : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15"}
            ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
          `}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter task name..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => setTouched(true)}
              disabled={isLoading}
              maxLength={MAX_LEN + 20}
              className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/50 disabled:cursor-not-allowed"
            />
            <span className={`text-xs flex-shrink-0 tabular-nums ${isOverLimit ? "text-destructive font-medium" : "text-muted-foreground/60"}`}>
              {charCount}/{MAX_LEN}
            </span>
          </div>
          {error && (
            <p className="flex items-center gap-1.5 mt-1.5 text-xs text-destructive font-medium">
              <AlertCircle size={11} />
              {error}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          {editTask ? (
            <>
              <button type="button" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCancel();
              }} disabled={isLoading} className={`${buttonStyles.secondary} flex-1`}>
                Cancel
              </button>
              <button type="submit" disabled={isLoading || isOverLimit} className={`${buttonStyles.primary} flex-1`}>
                {isLoading ? <><Spinner size={14} /> Updating...</> : <><Check size={14} /> Update Task</>}
              </button>
            </>
          ) : (
            <button type="submit" disabled={isLoading || isOverLimit} className={`${buttonStyles.primary} flex-1`}>
              {isLoading ? <><Spinner size={14} /> Adding...</> : <><Plus size={14} /> Add Task</>}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
