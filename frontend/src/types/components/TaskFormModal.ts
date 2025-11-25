import type { TaskFormValues } from '../../types/task';

export interface TaskFormModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialValues?: TaskFormValues;
  onClose: () => void;
  onSubmit: (payload: TaskFormValues) => Promise<void> | void;
}
