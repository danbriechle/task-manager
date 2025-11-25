// frontend/src/hooks/useTasks.ts
import { useEffect, useState, useCallback } from 'react';
import type { Task } from '../types/task';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const addTask = useCallback(async (params: Parameters<typeof createTask>[0]) => {
    const newTask = await createTask(params);
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const patchTask = useCallback(async (id: number, payload: Parameters<typeof updateTask>[1]) => {
    const updated = await updateTask(id, payload);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }, []);

  const removeTask = useCallback(async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tasks, loading, error, reload: load, addTask, patchTask, removeTask };
}
