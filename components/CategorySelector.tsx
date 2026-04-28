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

const CategorySelector: React.FC<CategorySelectorProps> = ({
  category,
  selectedLevel,
  onSelect,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          {category.name}
        </h2>
        <p className="text-slate-500 mt-1 text-sm">
          {category.description}
        </p>
      </div>

      <div className="space-y-2.5">
        {LEVELS_ORDER.map((level) => {
          const isSelected = selectedLevel === level;
          const config = LEVEL_CONFIG[level];

          return (
            <button
              key={level}
              type="button"
              onClick={() => onSelect(category.name, level)}
              className={`group w-full text-left p-3.5 rounded-xl border transition-all duration-200 ease-out
                ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-sm scale-[1.01]'
                    : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 hover:shadow-sm hover:-translate-y-0.5'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-100`}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span
                    className={`font-semibold text-base ${
                      isSelected ? 'text-blue-700' : 'text-slate-800'
                    }`}
                  >
                    {level}
                  </span>

                  <p
                    className={`mt-1 text-xs sm:text-sm leading-5 ${
                      isSelected ? 'text-slate-700' : 'text-slate-500'
                    }`}
                  >
                    {category.levelDescriptions[level]}
                  </p>
                </div>

                <div
                  className={`w-4 h-4 rounded-full shrink-0 mt-1 ${config.color} transition-transform duration-200 group-hover:scale-110`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
