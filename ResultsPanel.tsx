
import React from 'react';
import { Selections, Level } from '../types';
import { LEVEL_CONFIG, CATEGORIES } from '../constants';

interface ResultsPanelProps {
  selections: Selections;
  score: number;
  outcomeLevel: Level | null;
  isComplete: boolean;
  onReset: () => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ selections, score, outcomeLevel, isComplete, onReset }) => {
  return (
    <div className="sticky top-8 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-3 mb-4">Outcome</h2>
        {isComplete && outcomeLevel ? (
          <div className={`p-8 rounded-lg text-white text-center flex flex-col items-center justify-center transition-all duration-300 ${LEVEL_CONFIG[outcomeLevel].color}`}>
            <span className="text-5xl font-extrabold">{outcomeLevel}</span>
            <span className="text-lg font-semibold mt-2">({score.toFixed(2)} / 5.00)</span>
            <p className="text-sm opacity-90 mt-2">{LEVEL_CONFIG[outcomeLevel].description}</p>
          </div>
        ) : (
          <div className="text-center py-10 px-4 bg-slate-100 rounded-lg">
            <p className="text-slate-500 font-semibold">Please complete all categories to see the result.</p>
          </div>
        )}
      </div>

      {isComplete && (
        <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
          <h3 className="text-xl font-bold text-slate-800 border-b pb-3 mb-4">Summary</h3>
          <ul className="space-y-3">
            {CATEGORIES.map(category => {
              const selectedLevel = selections[category.name];
              if (!selectedLevel) return null;
              const config = LEVEL_CONFIG[selectedLevel];
              return (
                <li key={category.name} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{category.name}</span>
                  <span className={`font-bold ${config.textColor}`}>{selectedLevel}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      
      <button
        onClick={onReset}
        className="w-full bg-slate-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
      >
        Reset Grades
      </button>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ResultsPanel;
