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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);
  const categoryRefs = useRef<Array<HTMLDivElement | null>>([]);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);

    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setSelections(parsed.selections || {});
        setCandidateName(parsed.candidateName || '');
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ selections, candidateName })
    );
  }, [selections, candidateName]);

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

  const handleSelect = useCallback((category: CategoryName, level: Level) => {
    setSelections(prev => ({ ...prev, [category]: level }));

    const currentIndex = CATEGORIES.findIndex(item => item.name === category);
    const nextCategory = categoryRefs.current[currentIndex + 1];

    setTimeout(() => {
      if (nextCategory) {
        nextCategory.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 250);
  }, []);

  const handleNameChange = useCallback((name: string) => {
    setCandidateName(name);
  }, []);

  const handleReset = useCallback(() => {
    setSelections({});
    setCandidateName('');
    hasPlayedRef.current = false;
    localStorage.removeItem(STORAGE_KEY);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
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

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Header />

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex-1">
              <CandidateInput value={candidateName} onChange={handleNameChange} />
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto rounded-xl px-5 py-3 text-sm font-semibold text-white bg-slate-600 hover:bg-slate-700 transition"
            >
              Reset Grades
            </button>
          </div>
        </div>

        {CATEGORIES.map((category, index) => (
          <div
            key={category.name}
            ref={el => {
              categoryRefs.current[index] = el;
            }}
            className="scroll-mt-24"
          >
            <CategorySelector
              category={category}
              selectedLevel={selections[category.name]}
              onSelect={handleSelect}
            />
          </div>
        ))}

        <div ref={resultsRef} className="scroll-mt-24 pb-8">
          <ResultsPanel
            selections={selections}
            candidateName={candidateName}
            score={score}
            outcomeLevel={outcomeLevel}
            isComplete={isComplete}
            onReset={handleReset}
          />
        </div>
      </main>

      <audio ref={audioRef} src="/success.mp3" preload="auto" />
    </div>
  );
};

export default App;
