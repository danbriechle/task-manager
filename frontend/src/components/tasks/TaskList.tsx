import type { FC } from 'react';
import { TaskCard } from './TaskCard';
import type { TaskListProps } from '../../types/components/TaskList';

export const TaskList: FC<TaskListProps> = ({ tasks, onEditTask, onDeleteTask }) => {
  if (!tasks.length) {
    return <div>No tasks match your search.</div>;
  }

  return (
    <section style={{ marginTop: '1rem' }}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={() => onEditTask(task)}
          onDelete={onDeleteTask}
        />
      ))}
    </section>
  );
};
