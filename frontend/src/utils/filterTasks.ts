import type { Task } from '../types/task';

export function filterTasks(tasks: Task[], query: string): Task[] {
  const q = query.trim().toLowerCase();
  if (!q) return tasks;

  return tasks.filter((t) => {
    const inTitle = t.title.toLowerCase().includes(q);
    const inContent = (t.content ?? '').toLowerCase().includes(q);
    return inTitle || inContent;
  });
}
