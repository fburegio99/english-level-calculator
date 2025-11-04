
import React, { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import ResultsPanel from './components/ResultsPanel';
import { Selections, CategoryName, Level } from './types';
import { CATEGORIES, LEVEL_CONFIG, getOutcomeLevel } from './constants';
import CandidateInput from './components/CandidateInput';

const App: React.FC = () => {
  const [selections, setSelections] = useState<Selections>({});
  const [candidateName, setCandidateName] = useState('');

  const handleSelect = useCallback((category: CategoryName, level: Level) => {
    setSelections(prev => ({ ...prev, [category]: level }));
  }, []);

  const handleNameChange = useCallback((name: string) => {
    setCandidateName(name);
  }, []);

  const handleReset = useCallback(() => {
    setSelections({});
    setCandidateName('');
  }, []);

  const { score, outcomeLevel, isComplete } = useMemo(() => {
    const selectedCategories = Object.keys(selections);
    const isComplete = selectedCategories.length === CATEGORIES.length;

    if (!isComplete) {
      return { score: 0, outcomeLevel: null, isComplete: false };
    }

    const totalScore = CATEGORIES.reduce((acc, category) => {
      const selectedLevel = selections[category.name];
      if (selectedLevel) {
        const levelScore = LEVEL_CONFIG[selectedLevel].score;
        return acc + levelScore * category.weight;
      }
      return acc;
    }, 0);

    const finalOutcome = getOutcomeLevel(totalScore);
    return { score: totalScore, outcomeLevel: finalOutcome, isComplete: true };
  }, [selections]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Header />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CandidateInput value={candidateName} onChange={handleNameChange} />
            {CATEGORIES.map(category => (
              <CategorySelector
                key={category.name}
                category={category}
                selectedLevel={selections[category.name]}
                onSelect={handleSelect}
              />
            ))}
          </div>
          <div className="mt-8 lg:mt-0">
            <ResultsPanel
              selections={selections}
              candidateName={candidateName}
              score={score}
              outcomeLevel={outcomeLevel}
              isComplete={isComplete}
              onReset={handleReset}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
