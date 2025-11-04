
import { Level, CategoryName } from './types';

export const LEVELS_ORDER: Level[] = [Level.Excellent, Level.VeryGood, Level.Good, Level.Fair, Level.Unqualified];

export const LEVEL_CONFIG: { [key in Level]: { score: number; color: string; textColor: string; description: string } } = {
  [Level.Excellent]: { score: 5, color: 'bg-blue-500', textColor: 'text-blue-500', description: 'Excellent proficiency' },
  [Level.VeryGood]: { score: 4, color: 'bg-green-500', textColor: 'text-green-500', description: 'Very Good proficiency' },
  [Level.Good]: { score: 3, color: 'bg-yellow-500', textColor: 'text-yellow-500', description: 'Good proficiency' },
  [Level.Fair]: { score: 2, color: 'bg-orange-500', textColor: 'text-orange-500', description: 'Fair proficiency' },
  [Level.Unqualified]: { score: 1, color: 'bg-red-500', textColor: 'text-red-500', description: 'Unqualified' },
};

export const CATEGORIES: { name: CategoryName; weight: number; description: string; levelDescriptions: { [key in Level]: string } }[] = [
  {
    name: 'General Understanding',
    weight: 0.35,
    description: 'Assesses comprehension of spoken English.',
    levelDescriptions: {
      [Level.Excellent]: 'The conversation runs smoothly, the applicant understands what you say, but probably could not understand slang expressions from a native speaker.',
      [Level.VeryGood]: 'The applicant understands almost everything, but sometimes needs you to repeat or rephrase a question.',
      [Level.Good]: 'The applicant understands most of what is said, but often struggles with complex sentences or vocabulary.',
      [Level.Fair]: 'The applicant has difficulty understanding, requiring frequent repetition and simplification of questions.',
      [Level.Unqualified]: 'The applicant understands very little and cannot follow a basic conversation.',
    },
  },
  {
    name: 'Fluency',
    weight: 0.3,
    description: 'Evaluates the flow and ease of speech.',
    levelDescriptions: {
      [Level.Excellent]: 'The applicant\'s fluency is excellent. You can tell the applicant is not a native speaker.',
      [Level.VeryGood]: 'The applicant speaks smoothly with some hesitation, but it does not impede communication.',
      [Level.Good]: 'The applicant speaks with noticeable hesitation and has to search for words, making the conversation somewhat slow.',
      [Level.Fair]: 'The applicant speaks in short, fragmented sentences with long pauses. Communication is difficult.',
      [Level.Unqualified]: 'The applicant is unable to form coherent sentences and communication is nearly impossible.',
    },
  },
  {
    name: 'Vocabulary',
    weight: 0.2,
    description: 'Measures the range and appropriate use of words.',
    levelDescriptions: {
      [Level.Excellent]: 'The applicant has a wide range of vocabulary and uses it appropriately and accurately for most topics.',
      [Level.VeryGood]: 'The applicant has a moderate vocabulary that lets them construct the sentences and speak only in English, but with an effort.',
      [Level.Good]: 'The applicant has enough vocabulary for basic topics but makes frequent errors in word choice.',
      [Level.Fair]: 'The applicant has a limited vocabulary, relying on simple words and often uses them incorrectly.',
      [Level.Unqualified]: 'The applicant lacks the basic vocabulary needed to express even simple ideas.',
    },
  },
  {
    name: 'Pronunciation',
    weight: 0.15,
    description: 'Judges the clarity and accuracy of spoken sounds.',
    levelDescriptions: {
      [Level.Excellent]: 'Pronunciation is clear and easily understood. The accent is noticeable but does not affect comprehension.',
      [Level.VeryGood]: 'The applicant pronounces everything in English. However, their phonetics is not 100% accurate.',
      [Level.Good]: 'Pronunciation is generally intelligible, but some sounds are incorrect, which can occasionally cause confusion.',
      [Level.Fair]: 'Pronunciation is heavily influenced by their native language, making them difficult to understand at times.',
      [Level.Unqualified]: 'Pronunciation is very poor, making it extremely difficult to understand what is being said.',
    },
  },
];

export const getOutcomeLevel = (score: number): Level | null => {
  if (score >= 4.5) return Level.Excellent;
  if (score >= 3.5) return Level.VeryGood;
  if (score >= 2.5) return Level.Good;
  if (score >= 1.5) return Level.Fair;
  if (score >= 1.0) return Level.Unqualified;
  return null;
};
