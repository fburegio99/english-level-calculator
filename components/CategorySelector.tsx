import React from 'react';
import { CategoryName, Level } from '../types';
import { LEVEL_CONFIG, LEVELS_ORDER } from '../constants';

interface CategorySelectorProps {
  category: {
    name: CategoryName;
    description: string;
    levelDescriptions: { [key in Level]: string };
  };
  selectedLevel?: Level;
  onSelect: (category: CategoryName, level: Level) => void;
}

// 🧠 Cheat sheet helper
const getCheatSheet = (level: Level) => {
  switch (level) {
    case Level.Excellent:
      return "No repetition needed. Fully smooth conversation.";
    case Level.VeryGood:
      return "Rare pauses or clarifications.";
    case Level.Good:
      return "Noticeable pauses or some difficulty with complex ideas.";
    case Level.Fair:
      return "You had to repeat or rephrase multiple times.";
    case Level.Unqualified:
      return "Struggled to communicate or understand basic questions.";
  }
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ category, selectedLevel, onSelect }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-shadow hover:shadow-xl">
      <h2 className="text-2xl font-bold text-slate-800">{category.name}</h2>
      <p className="text-slate-500 mt-1 mb-6">{category.description}</p>

      <div className="space-y-3">
        {LEVELS_ORDER.map((level) => {
          const isSelected = selectedLevel === level;
          const config = LEVEL_CONFIG[level];
          const ringColor = isSelected ? config.textColor.replace('text-', 'ring-') : 'ring-slate-300';
          const hoverRingColor = isSelected ? ringColor : 'hover:ring-blue-400';

          return (
            <div key={level} className="relative group">
              <button
                onClick={() => onSelect(category.name, level)}
                className={`w-full text-left p-4 rounded-lg border-2 border-transparent ring-2 ${ringColor} ${hoverRingColor} focus:outline-none focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out ${
                  isSelected ? 'bg-blue-50' : 'bg-slate-50 hover:bg-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-semibold text-lg ${isSelected ? 'text-blue-600' : 'text-slate-700'}`}>
                    {level}
                  </span>
                  <div className={`w-5 h-5 rounded-full ${config.color}`}></div>
                </div>

                <p className={`mt-1 text-sm ${isSelected ? 'text-slate-600' : 'text-slate-500'}`}>
                  {category.levelDescriptions[level]}
                </p>
              </button>

              {/* 🧠 Cheat sheet tooltip */}
              <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-slate-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg z-10 w-max max-w-xs">
                {getCheatSheet(level)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
