import { request } from './client';
import type { Task } from '../types/task';

export async function fetchTasks(): Promise<Task[]> {
  return request<Task[]>('/tasks');
}

export async function createTask(
  payload: Pick<Task, 'title' | 'content' | 'status' | 'due_at'>,
): Promise<Task> {
  return request<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify({ task: payload }),
  });
}

export async function updateTask(
  id: number,
  payload: Partial<Pick<Task, 'title' | 'content' | 'status' | 'due_at'>>,
): Promise<Task> {
  return request<Task>(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ task: payload }),
  });
}

export async function deleteTask(id: number): Promise<void> {
  await request<void>(`/tasks/${id}`, { method: 'DELETE' });
}
