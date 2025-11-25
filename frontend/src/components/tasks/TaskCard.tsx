import type { FC } from 'react';
import type { TaskCardProps } from '../../types/components/TaskCard';

export const TaskCard: FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const due = task.due_at ? new Date(task.due_at).toLocaleDateString() : null;

  return (
    <article className="task-card">
      <div className="task-card__header">
        <h2 className="task-card__title">{task.title}</h2>
        <span className="task-card__status">{task.status.replace('_', ' ')}</span>
      </div>

      {task.content && <p className="task-card__content">{task.content}</p>}

      <div className="task-card__footer">
        <div className="task-card__meta">{due && <>Due {due}</>}</div>

        <div className="task-card__actions">
          <button type="button" onClick={onEdit}>
            Edit
          </button>
          <button type="button" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};
