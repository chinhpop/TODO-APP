import { Trash2 } from "lucide-react";
import { buttonStyles } from "../../constants/ui";

export function DeleteModal({ taskTitle, onConfirm, onCancel }: {
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-sm p-6 animate-scale-in">
        <div className="flex items-center justify-center w-12 h-12 bg-rose-50 rounded-xl mb-4 mx-auto">
          <Trash2 size={22} className="text-destructive" />
        </div>
        <h2 className="text-lg font-semibold text-foreground text-center mb-1">Delete Task?</h2>
        <p className="text-sm text-muted-foreground text-center mb-1">Are you sure you want to delete</p>
        <p className="text-sm font-medium text-foreground text-center truncate mb-6 px-2">"{taskTitle}"</p>
        <p className="text-xs text-muted-foreground text-center mb-6">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className={`${buttonStyles.secondary} flex-1`}>Cancel</button>
          <button onClick={onConfirm} className={`${buttonStyles.danger} flex-1`}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
