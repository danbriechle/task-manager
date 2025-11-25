import type { FC, ChangeEvent } from 'react';
import type { NavbarProps } from '../../types/components/Navbar';

export const Navbar: FC<NavbarProps> = ({ search, onSearchChange, onNewTaskClick }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <header className="navbar">
      <h1 className="navbar__title">Task Manager</h1>

      <input
        type="search"
        value={search}
        onChange={handleChange}
        placeholder="Search tasks..."
        className="navbar__search"
      />

      <button type="button" onClick={onNewTaskClick} className="navbar__button">
        + New
      </button>
    </header>
  );
};
