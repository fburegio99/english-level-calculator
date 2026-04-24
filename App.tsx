import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import ResultsPanel from './components/ResultsPanel';
import { Selections, CategoryName, Level } from './types';
import { CATEGORIES, LEVEL_CONFIG, getOutcomeLevel } from './constants';
import CandidateInput from './components/CandidateInput';

const STORAGE_KEY = 'english-level-calculator-progress';

const App: React.FC = () => {
  const [selections, setSelections] = useState<Selections>({});
  const [candidateName, setCandidateName] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);

    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setSelections(parsed.selections || {});
        setCandidateName(parsed.candidateName || '');
        setCurrentStep(parsed.currentStep || 0);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selections,
        candidateName,
        currentStep,
      })
    );
  }, [selections, candidateName, currentStep]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleSelect = useCallback((category: CategoryName, level: Level) => {
    setSelections(prev => ({ ...prev, [category]: level }));

    setTimeout(() => {
      setCurrentStep(prev => {
        if (prev < CATEGORIES.length) {
          return prev + 1;
        }

        return prev;
      });
    }, 250);
  }, []);

  const handleNameChange = useCallback((name: string) => {
    setCandidateName(name);
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const handleReset = useCallback(() => {
    setSelections({});
    setCandidateName('');
    setCurrentStep(0);
    localStorage.removeItem(STORAGE_KEY);
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

  const currentCategory = CATEGORIES[currentStep];

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Header />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CandidateInput value={candidateName} onChange={handleNameChange} />

            {!isComplete && currentCategory && (
              <>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-slate-500">
                      Step {currentStep + 1} of {CATEGORIES.length}
                    </p>

                    {currentStep > 0 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        Back
                      </button>
                    )}
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentStep + 1) / CATEGORIES.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <CategorySelector
                  key={currentCategory.name}
                  category={currentCategory}
                  selectedLevel={selections[currentCategory.name]}
                  onSelect={handleSelect}
                />
              </>
            )}

            {isComplete && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                <h2 className="text-xl font-semibold text-slate-800 mb-2">
                  Assessment complete
                </h2>
                <p className="text-slate-600">
                  You can review the result on the panel.
                </p>

                <button
                  type="button"
                  onClick={handleBack}
                  className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Back to previous category
                </button>
              </div>
            )}
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
