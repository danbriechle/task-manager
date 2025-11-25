import { useMemo, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { TaskList } from './components/tasks/TaskList';
import { TaskFormModal } from './components/tasks/TaskFormModal';
import { useTasks } from './hooks/useTasks';
import type { Task, TaskFormValues } from './types/task';
import { filterTasks } from './utils/filterTasks';

function App() {
  const { tasks, loading, error, addTask, patchTask, removeTask } = useTasks();
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => filterTasks(tasks, search), [tasks, search]);

  const handleCreateSubmit = async (payload: TaskFormValues) => {
    await addTask(payload);
  };

  const handleEditSubmit = async (payload: TaskFormValues) => {
    if (!editingTask) return;
    await patchTask(editingTask.id, payload);
  };

  const handleDelete = async (id: number) => {
    await removeTask(id);
  };

  const modalOpen = isCreateOpen || !!editingTask;
  const modalMode = editingTask ? 'edit' : ('create' as const);
  const modalInitialValues: TaskFormValues | undefined = editingTask
    ? {
        title: editingTask.title,
        content: editingTask.content,
        status: editingTask.status,
        due_at: editingTask.due_at,
      }
    : undefined;

  const handleModalClose = () => {
    setIsCreateOpen(false);
    setEditingTask(null);
  };

  const handleModalSubmit = async (payload: TaskFormValues) => {
    if (editingTask) {
      await handleEditSubmit(payload);
      setEditingTask(null);
    } else {
      await handleCreateSubmit(payload);
      setIsCreateOpen(false);
    }
  };

  return (
    <div className="tasks-page">
      <Navbar
        search={search}
        onSearchChange={setSearch}
        onNewTaskClick={() => setIsCreateOpen(true)}
      />

      <main className="tasks-page__main">
        {loading && <div>Loading tasks…</div>}
        {error && <div className="error-banner">Error: {error}</div>}

        {!loading && !error && (
          <TaskList tasks={filteredTasks} onEditTask={setEditingTask} onDeleteTask={handleDelete} />
        )}
      </main>

      <TaskFormModal
        open={modalOpen}
        mode={modalMode}
        initialValues={modalInitialValues}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

export default App;
