import { useEffect } from "react";
import { AlertCircle, Bell, Check, X } from "lucide-react";
import type { Toast, ToastKind } from "../../types/task";

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const t = window.setTimeout(() => onDismiss(toast.id), 3500);
    return () => window.clearTimeout(t);
  }, [toast.id, onDismiss]);

  const colors: Record<ToastKind, string> = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error: "bg-rose-50 border-rose-200 text-rose-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };
  const icons: Record<ToastKind, React.ReactNode> = {
    success: <Check size={15} className="text-emerald-500 flex-shrink-0" />,
    error: <AlertCircle size={15} className="text-rose-500 flex-shrink-0" />,
    info: <Bell size={15} className="text-blue-500 flex-shrink-0" />,
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium min-w-[260px] max-w-xs animate-slide-up ${colors[toast.kind]}`}>
      {icons[toast.kind]}
      <span className="flex-1">{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} className="opacity-50 hover:opacity-100 transition-opacity ml-1">
        <X size={13} />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
      {toasts.map((t) => <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />)}
    </div>
  );
}
