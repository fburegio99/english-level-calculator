import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/Velozient-Logo-Hi-Res.jpg"
              alt="Velozient"
              className="h-8 w-auto cursor-pointer select-none"
            />

            <h1 className="text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-100">
              English Level Calculator
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setDarkMode(prev => !prev)}
            className="rounded-full px-4 py-2 text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
