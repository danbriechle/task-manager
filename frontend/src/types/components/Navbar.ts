export interface NavbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onNewTaskClick?: () => void;
}
