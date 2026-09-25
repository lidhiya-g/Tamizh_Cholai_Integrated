import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn-icon"
      aria-label={theme === 'dark' ? 'ஒளி பயன்முறைக்கு மாற்றுக' : 'இருள் பயன்முறைக்கு மாற்றுக'}
      title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      id="theme-toggle-btn"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-slate-700" />
      )}
    </button>
  );
};

export default ThemeToggle;
