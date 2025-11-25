export type TaskStatus = 'pending' | 'in_progress' | 'blocked' | 'completed';

export interface Task {
  id: number;
  title: string;
  content: string | null;
  status: TaskStatus;
  due_at: string | null;
}

export type TaskFormValues = {
  title: string;
  content: string | null;
  status: TaskStatus;
  due_at: string | null;
};
