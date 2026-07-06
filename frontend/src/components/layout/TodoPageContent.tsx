import { DeleteModal } from "../common/Modal";
import { ToastContainer } from "../common/Toast";
import { Header } from "./Header";
import { TodoForm } from "../todo/TodoForm";
import { SearchBar } from "../todo/SearchBar";
import { TodoListPanel } from "../todo/TodoListPanel";
import { DataErrorState, Page404, Page500, PageNetwork } from "../todo/states";
import type { StatusFilter, Task, TimeFilter, Toast } from "../../types/task";
import { useNavigate } from "react-router-dom";

type TodoPageContentProps = {
  counts: { total: number; completed: number; pending: number };
  query: string;
  statusFilter: StatusFilter;
  timeFilter: TimeFilter;
  editingTask: Task | null;
  deleteTarget: Task | null;
  toasts: Toast[];
  page: number;
  formLoading: boolean;
  loadError: string | null;
  uiState: "loading" | "ready" | "network" | "server" | "error" | "not-found";
  isFiltered: boolean;
  isInitialLoading: boolean;
  paginated: Task[];
  filtered: Task[];
  setQuery: (value: string) => void;
  setStatusFilter: (value: StatusFilter) => void;
  setTimeFilter: (value: TimeFilter) => void;
  setEditingTask: (task: Task | null) => void;
  setDeleteTarget: (task: Task | null) => void;
  setPage: (page: number) => void;
  dismissToast: (id: string) => void;
  retryLoadTasks: () => void;
  handleAdd: (title: string) => void;
  handleUpdate: (id: string, title: string) => void;
  handleToggle: (id: string) => void;
  handleDeleteConfirm: () => void;
};

export function TodoPageContent(props: TodoPageContentProps) {
  const {
    counts,
    query,
    statusFilter,
    timeFilter,
    editingTask,
    deleteTarget,
    toasts,
    page,
    formLoading,
    loadError,
    uiState,
    isFiltered,
    isInitialLoading,
    paginated,
    filtered,
    setQuery,
    setStatusFilter,
    setTimeFilter,
    setEditingTask,
    setDeleteTarget,
    setPage,
    dismissToast,
    retryLoadTasks,
    handleAdd,
    handleUpdate,
    handleToggle,
    handleDeleteConfirm,
  } = props;

  const navigate = useNavigate();

  const mainContent = () => {
    if (isInitialLoading || uiState === "loading") return (
      <>
        <Header total={0} completed={0} pending={0} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-4">
          <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded-md w-24" />
            <div className="h-10 bg-muted animate-pulse rounded-xl" />
            <div className="h-9 bg-muted animate-pulse rounded-lg" />
          </div>
          <div className="h-10 bg-card animate-pulse rounded-xl border border-border" />
          <div className="bg-card rounded-2xl border border-border shadow-sm">
            <div className="px-4 py-3 border-b border-border">
              <div className="h-8 bg-muted animate-pulse rounded-xl w-64" />
            </div>
            <div className="p-3">
              <div className="space-y-3">
                <div className="flex items-center justify-center py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    Loading tasks...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );

    if (uiState === "network") return (
      <>
        <Header total={counts.total} completed={counts.completed} pending={counts.pending} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <PageNetwork onRetry={retryLoadTasks} />
        </div>
      </>
    );

    if (uiState === "server") return (
      <>
        <Header total={counts.total} completed={counts.completed} pending={counts.pending} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <Page500 onRetry={retryLoadTasks} onHome={() => navigate("/")} />
        </div>
      </>
    );

    if (uiState === "not-found") return (
      <>
        <Header total={counts.total} completed={counts.completed} pending={counts.pending} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <Page404 onHome={() => navigate("/")} />
        </div>
      </>
    );

    if (uiState === "error" || (loadError && filtered.length === 0)) return (
      <>
        <Header total={counts.total} completed={counts.completed} pending={counts.pending} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <DataErrorState onRetry={retryLoadTasks} />
        </div>
      </>
    );

    return (
      <>
        <Header total={counts.total} completed={counts.completed} pending={counts.pending} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-4 pb-24">
          <TodoForm
            editTask={editingTask}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onCancel={() => setEditingTask(null)}
            isLoading={formLoading}
          />

          <SearchBar value={query} onChange={setQuery} />

          <TodoListPanel
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            timeFilter={timeFilter}
            onTimeChange={setTimeFilter}
            tasks={paginated}
            total={filtered.length}
            completed={counts.completed}
            isFiltered={isFiltered}
            page={page}
            onPageChange={setPage}
            onToggle={handleToggle}
            onEdit={(task) => {
              setEditingTask(task);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onDelete={setDeleteTarget}
          />
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-up { animation: slide-up 0.2s ease-out; }
        .animate-scale-in { animation: scale-in 0.15s ease-out; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }
      `}</style>

      {mainContent()}

      {deleteTarget && (
        <DeleteModal
          taskTitle={deleteTarget.title}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
