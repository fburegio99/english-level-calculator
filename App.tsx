import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

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
      JSON.stringify({ selections, candidateName, currentStep })
    );
  }, [selections, candidateName, currentStep]);

  const handleSelect = useCallback((category: CategoryName, level: Level) => {
    setSelections(prev => ({ ...prev, [category]: level }));

    setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, CATEGORIES.length));
    }, 280);
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
    hasPlayedRef.current = false;
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const { score, outcomeLevel, isComplete } = useMemo(() => {
    const isComplete = Object.keys(selections).length === CATEGORIES.length;

    if (!isComplete) {
      return { score: 0, outcomeLevel: null, isComplete: false };
    }

    const totalScore = CATEGORIES.reduce((acc, category) => {
      const selectedLevel = selections[category.name];

      if (selectedLevel) {
        return acc + LEVEL_CONFIG[selectedLevel].score * category.weight;
      }

      return acc;
    }, 0);

    return {
      score: totalScore,
      outcomeLevel: getOutcomeLevel(totalScore),
      isComplete: true,
    };
  }, [selections]);

  useEffect(() => {
    if (isComplete && audioRef.current && !hasPlayedRef.current) {
      audioRef.current.currentTime = 1.9;
      audioRef.current.play();
      hasPlayedRef.current = true;
    }

    if (!isComplete) {
      hasPlayedRef.current = false;
    }
  }, [isComplete]);

  const currentCategory = CATEGORIES[currentStep];
  const progressPercentage = Math.min(
    ((currentStep + 1) / CATEGORIES.length) * 100,
    100
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      <Header />

      <main className="h-[calc(100vh-57px)] max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="h-full flex flex-col justify-center gap-4">
          {!isComplete && (
            <>
              <CandidateInput value={candidateName} onChange={handleNameChange} />

              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">
                      Step {currentStep + 1} of {CATEGORIES.length}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Select the best option. The form will move forward automatically.
                    </p>
                  </div>

                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                    >
                      Back
                    </button>
                  )}
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {currentCategory && (
                <div key={currentCategory.name} className="animate-[fadeIn_0.35s_ease-out]">
                  <CategorySelector
                    category={currentCategory}
                    selectedLevel={selections[currentCategory.name]}
                    onSelect={handleSelect}
                  />
                </div>
              )}
            </>
          )}

          {isComplete && (
            <div className="animate-[fadeIn_0.35s_ease-out]">
              <ResultsPanel
                selections={selections}
                candidateName={candidateName}
                score={score}
                outcomeLevel={outcomeLevel}
                isComplete={isComplete}
                onReset={handleReset}
              />

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className="mt-4 rounded-full px-5 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                >
                  Back to previous category
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <audio ref={audioRef} src="/success.mp3" preload="auto" />
    </div>
  );
};

export default App;
