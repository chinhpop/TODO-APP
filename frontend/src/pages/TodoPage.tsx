import { TodoPageContent } from "../components/layout/TodoPageContent";
import { useTodoApp } from "../hooks/useTodoApp";

export function TodoPage() {
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
  } = useTodoApp();

  return (
    <TodoPageContent
      counts={counts}
      query={query}
      statusFilter={statusFilter}
      timeFilter={timeFilter}
      editingTask={editingTask}
      deleteTarget={deleteTarget}
      toasts={toasts}
      page={page}
      formLoading={formLoading}
      loadError={loadError}
      uiState={uiState}
      isFiltered={isFiltered}
      isInitialLoading={isInitialLoading}
      paginated={paginated}
      filtered={filtered}
      setQuery={setQuery}
      setStatusFilter={setStatusFilter}
      setTimeFilter={setTimeFilter}
      setEditingTask={setEditingTask}
      setDeleteTarget={setDeleteTarget}
      setPage={setPage}
      dismissToast={dismissToast}
      retryLoadTasks={retryLoadTasks}
      handleAdd={handleAdd}
      handleUpdate={handleUpdate}
      handleToggle={handleToggle}
      handleDeleteConfirm={handleDeleteConfirm}
    />
  );
}
