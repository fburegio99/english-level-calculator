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

const getCheatSheet = (categoryName: CategoryName, level: Level) => {
  const cheats = {
    'General Understanding': {
      [Level.Excellent]: 'Understood everything immediately, even complex questions.',
      [Level.VeryGood]: 'Understood almost everything, only minor clarification needed.',
      [Level.Good]: 'Understood main ideas but struggled with complex sentences.',
      [Level.Fair]: 'You had to repeat or rephrase several times.',
      [Level.Unqualified]: 'Could not follow basic questions.',
    },
    Fluency: {
      [Level.Excellent]: 'Speaks smoothly with no hesitation.',
      [Level.VeryGood]: 'Minor pauses, but overall natural flow.',
      [Level.Good]: 'Noticeable pauses while forming sentences.',
      [Level.Fair]: 'Frequent pauses and broken flow.',
      [Level.Unqualified]: 'Cannot maintain a conversation.',
    },
    Vocabulary: {
      [Level.Excellent]: 'Uses varied and precise vocabulary naturally.',
      [Level.VeryGood]: 'Good vocabulary with occasional gaps.',
      [Level.Good]: 'Basic vocabulary, some repetition.',
      [Level.Fair]: 'Limited vocabulary, struggles to explain ideas.',
      [Level.Unqualified]: 'Very basic or memorized words only.',
    },
    Pronunciation: {
      [Level.Excellent]: 'Crystal clear, no effort needed to understand.',
      [Level.VeryGood]: 'Accent present but easy to understand.',
      [Level.Good]: 'Sometimes requires extra attention to understand.',
      [Level.Fair]: 'Frequent mispronunciations make it hard to follow.',
      [Level.Unqualified]: 'Very difficult to understand.',
    },
  };

  return cheats[categoryName]?.[level];
};

const CategorySelector: React.FC<CategorySelectorProps> = ({
  category,
  selectedLevel,
  onSelect,
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 w-full">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
          {category.name}
        </h2>
        <p className="text-slate-500 mt-1 text-xs sm:text-sm">
          {category.description}
        </p>
      </div>

      <div className="space-y-2">
        {LEVELS_ORDER.map((level) => {
          const isSelected = selectedLevel === level;
          const config = LEVEL_CONFIG[level];
          const cheatSheet = getCheatSheet(category.name, level);

          return (
            <div key={level} className="relative group">
              <button
                type="button"
                onClick={() => onSelect(category.name, level)}
                className={`group w-full text-left p-3 rounded-xl border transition-all duration-200 ease-out
                  ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-sm scale-[1.01]'
                      : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 hover:shadow-sm hover:-translate-y-0.5'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-100`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <span
                      className={`font-semibold text-sm sm:text-base ${
                        isSelected ? 'text-blue-700' : 'text-slate-800'
                      }`}
                    >
                      {level}
                    </span>

                    <p
                      className={`mt-1 text-[11px] sm:text-sm leading-5 ${
                        isSelected ? 'text-slate-700' : 'text-slate-500'
                      }`}
                    >
                      {category.levelDescriptions[level]}
                    </p>
                  </div>

                  <div
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shrink-0 mt-1 ${config.color} transition-transform duration-200 group-hover:scale-110`}
                  />
                </div>
              </button>

              {cheatSheet && (
                <div className="absolute left-full top-1/2 ml-3 hidden -translate-y-1/2 group-hover:block bg-slate-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg z-20 w-64">
                  {cheatSheet}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
