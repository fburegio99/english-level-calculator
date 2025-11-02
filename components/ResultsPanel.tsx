import React, { useState, useMemo } from 'react';
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
  const [copied, setCopied] = useState(false);

  const summaryText = useMemo(() => {
    if (!isComplete || !outcomeLevel) return '';

    const summaryLines = CATEGORIES.map(category => 
      `${category.name}:'${selections[category.name]}'`
    );

    return [
      'SUMMARY',
      ...summaryLines,
      `Result:'${outcomeLevel}'`
    ].join('\n');
  }, [selections, outcomeLevel, isComplete]);
  
  const handleCopy = () => {
    if (summaryText) {
      navigator.clipboard.writeText(summaryText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

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
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans">
              {summaryText}
            </pre>
          </div>
          <div className="mt-4 relative">
            <button
              onClick={handleCopy}
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Copy Summary
            </button>
            {copied && (
              <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 mt-2 text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full shadow-md animate-fade-in-out whitespace-nowrap">
                ✅ Summary copied to clipboard!
              </div>
            )}
          </div>
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
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(10px); }
          10%, 90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ResultsPanel;