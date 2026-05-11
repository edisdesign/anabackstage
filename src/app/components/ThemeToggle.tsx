import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-[#d4af37] transition-colors"
    >
      {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
};
