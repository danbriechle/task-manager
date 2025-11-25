import type { Task } from '../../types/task';

export interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: (id: number) => void;
}
