import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <img
          src="/Velozient-Logo-Hi-Res.jpg"
          alt="Velozient"
          className="h-8 w-auto"
        />

        <h1 className="text-lg sm:text-xl font-semibold text-slate-700">
          English Level Calculator
        </h1>
      </div>
    </header>
  );
};

export default Header;
