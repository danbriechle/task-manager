import type { FC, FormEvent } from 'react';
import type { TaskStatus, TaskFormValues } from '../../types/task';
import type { TaskFormModalProps } from '../../types/components/TaskFormModal';

function isoToDateInput(value: string | null): string {
  if (!value) return '';
  return value.slice(0, 10);
}

export const TaskFormModal: FC<TaskFormModalProps> = ({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
}) => {
  if (!open) return null;

  const defaults: TaskFormValues = initialValues ?? {
    title: '',
    content: null,
    status: 'pending',
    due_at: null,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = (formData.get('title') as string).trim();
    const content = (formData.get('content') as string)?.trim() || null;
    const status = (formData.get('status') as TaskStatus) || 'pending';
    const due_at_raw = (formData.get('due_at') as string) || '';
    const due_at = due_at_raw ? new Date(due_at_raw).toISOString() : null;

    if (!title) return;

    await onSubmit({ title, content, status, due_at });
    onClose();
    form.reset();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <header className="modal__header">
          <h2 className="modal__title">{mode === 'create' ? 'Create Task' : 'Edit Task'}</h2>
          <button type="button" className="modal__close" onClick={onClose}>
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal__body">
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" defaultValue={defaults.title} required />
          </div>

          <div className="form-field">
            <label htmlFor="content">Details</label>
            <textarea id="content" name="content" rows={3} defaultValue={defaults.content ?? ''} />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" defaultValue={defaults.status}>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="blocked">Blocked</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="due_at">Due date</label>
              <input
                id="due_at"
                name="due_at"
                type="date"
                defaultValue={isoToDateInput(defaults.due_at)}
              />
            </div>
          </div>

          <footer className="modal__footer">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">{mode === 'create' ? 'Create' : 'Save changes'}</button>
          </footer>
        </form>
      </div>
    </div>
  );
};
