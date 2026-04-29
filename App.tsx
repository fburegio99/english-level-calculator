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

  const { score, outcomeLevel, isComplete } = useMemo(() => {
    const isComplete = Object.keys(selections).length === CATEGORIES.length;

    if (!isComplete) {
      return { score: 0, outcomeLevel: null, isComplete: false };
    }

    const totalScore = CATEGORIES.reduce((acc, category) => {
      const selectedLevel = selections[category.name];
      return selectedLevel
        ? acc + LEVEL_CONFIG[selectedLevel].score * category.weight
        : acc;
    }, 0);

    return {
      score: totalScore,
      outcomeLevel: getOutcomeLevel(totalScore),
      isComplete: true,
    };
  }, [selections]);

  const handleNameChange = useCallback((name: string) => {
    setCandidateName(name);
  }, []);

  const handleBack = useCallback(() => {
    if (isComplete) {
      const lastCategory = CATEGORIES[CATEGORIES.length - 1];

      setSelections(prev => {
        const updated = { ...prev };
        delete updated[lastCategory.name];
        return updated;
      });

      setCurrentStep(CATEGORIES.length - 1);
      hasPlayedRef.current = false;
      return;
    }

    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, [isComplete]);

  const handleReset = useCallback(() => {
    setSelections({});
    setCandidateName('');
    setCurrentStep(0);
    hasPlayedRef.current = false;
    localStorage.removeItem(STORAGE_KEY);
  }, []);

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
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Header />

      <main className="w-full max-w-2xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        {!isComplete ? (
          <div className="min-h-[calc(100vh-90px)] flex flex-col justify-center gap-3 sm:gap-4">
            <CandidateInput value={candidateName} onChange={handleNameChange} />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2 sm:mb-3 gap-3">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">
                    Step {currentStep + 1} of {CATEGORIES.length}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                    Select the best option. The form will move forward automatically.
                  </p>
                </div>

                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                  >
                    Back
                  </button>
                )}
              </div>

              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
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
          </div>
        ) : (
          <div className="animate-[fadeIn_0.35s_ease-out] pb-8">
            <ResultsPanel
              selections={selections}
              candidateName={candidateName}
              score={score}
              outcomeLevel={outcomeLevel}
              isComplete={isComplete}
              onReset={handleReset}
            />

            <div className="mt-4 mb-6">
              <button
                type="button"
                onClick={handleBack}
                className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
              >
                Back to previous category
              </button>
            </div>
          </div>
        )}
      </main>

      <audio ref={audioRef} src="/success.mp3" preload="auto" />
    </div>
  );
};

export default App;
