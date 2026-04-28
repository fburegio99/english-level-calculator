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
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="mb-7">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {category.name}
        </h2>
        <p className="text-slate-500 mt-2">{category.description}</p>
      </div>

      <div className="space-y-4 pb-4">
        {LEVELS_ORDER.map((level) => {
          const isSelected = selectedLevel === level;
          const config = LEVEL_CONFIG[level];

          return (
            <button
              key={level}
              type="button"
              onClick={() => onSelect(category.name, level)}
              className={`group w-full text-left p-5 rounded-2xl border transition-all duration-200 ease-out
                ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.01]'
                    : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5'
                }
                focus:outline-none focus:ring-4 focus:ring-blue-100`}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span
                    className={`font-bold text-lg ${
                      isSelected ? 'text-blue-700' : 'text-slate-800'
                    }`}
                  >
                    {level}
                  </span>

                  <p
                    className={`mt-2 text-sm leading-6 ${
                      isSelected ? 'text-slate-700' : 'text-slate-500'
                    }`}
                  >
                    {category.levelDescriptions[level]}
                  </p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full shrink-0 mt-1 ${config.color} transition-transform duration-200 group-hover:scale-110`}
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
