import React from 'react';

const VelozientLogo: React.FC = () => (
  <svg 
    aria-label="Velozient Logo" 
    role="img" 
    width="180" 
    height="36" 
    viewBox="0 0 220 44" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Velozient Logo</title>
    {/* The icon on the left, with the brand's orange color */}
    <g 
      stroke="#f9a825" 
      strokeWidth="4.5" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M28 5 L45 22 L28 39" />
      <path d="M10 5 L27 22 L10 39" />
    </g>
    {/* The company name text, styled to match the brand's font and color */}
    <text 
      x="55" 
      y="32" 
      fontFamily="Verdana, Arial, sans-serif" 
      fontSize="28" 
      fontWeight="500"
      fill="#003865"
    >
      Velozient
    </text>
    {/* The "TM" trademark symbol, smaller and superscripted */}
    <text 
      x="195" 
      y="22" 
      fontFamily="Verdana, Arial, sans-serif" 
      fontSize="10" 
      fontWeight="500"
      fill="#003865"
    >
      TM
    </text>
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
        <VelozientLogo />
        <h1 className="text-xl sm:text-2xl font-bold text-slate-700 mt-2 sm:mt-0">
          English Level Calculator
        </h1>
      </div>
    </header>
  );
};

export default Header;
