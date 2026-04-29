import React from 'react';
import { Selections, Level } from '../types';
import { CATEGORIES, LEVEL_CONFIG } from '../constants';

interface ResultsPanelProps {
  selections: Selections;
  candidateName: string;
  score: number;
  outcomeLevel: Level | null;
  isComplete: boolean;
  onReset: () => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  selections,
  candidateName,
  score,
  outcomeLevel,
  isComplete,
  onReset,
}) => {
  const summaryText = [
    candidateName ? `Candidate: ${candidateName}` : null,
    'SUMMARY',
    ...CATEGORIES.map(category => {
      const selectedLevel = selections[category.name];
      return `${category.name}:'${selectedLevel || ''}'`;
    }),
    `Score:'${score.toFixed(2)} / 5.00'`,
    `Result:'${outcomeLevel || ''}'`,
  ]
    .filter(Boolean)
    .join('\n');

  const handleCopySummary = async () => {
    await navigator.clipboard.writeText(summaryText);
  };

  if (!isComplete || !outcomeLevel) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <h2 className="text-xl font-bold text-slate-800">Outcome</h2>

        <div className="border-t border-slate-200 mt-3 pt-4">
          <div className="bg-slate-100 rounded-xl p-6 text-center text-sm font-semibold text-slate-500">
            Please complete all categories to see the result.
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="mt-4 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white bg-slate-600 hover:bg-slate-700 transition"
        >
          Reset Grades
        </button>
      </div>
    );
  }

  const config = LEVEL_CONFIG[outcomeLevel];

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <h2 className="text-xl font-bold text-slate-800">Outcome</h2>

        <div className="border-t border-slate-200 mt-3 pt-4">
          <div className={`${config.color} rounded-xl p-6 text-center text-white`}>
            <div className="text-4xl sm:text-5xl font-black">
              {outcomeLevel}
            </div>

            <div className="mt-2 text-base font-bold">
              ({score.toFixed(2)} / 5.00)
            </div>

            <div className="mt-2 text-sm">
              {config.description}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <h2 className="text-lg font-bold text-slate-800">Summary</h2>

        <div className="border-t border-slate-200 mt-3 pt-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-700 whitespace-pre-line">
            {summaryText}
          </div>

          <button
            type="button"
            onClick={handleCopySummary}
            className="mt-4 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Copy Summary
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white bg-slate-600 hover:bg-slate-700 transition"
      >
        Reset Grades
      </button>
    </div>
  );
};

export default ResultsPanel;
