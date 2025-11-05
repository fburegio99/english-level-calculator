import { Level, CategoryName } from './types';

export const LEVELS_ORDER: Level[] = [
  Level.Excellent,
  Level.VeryGood,
  Level.Good,
  Level.Fair,
  Level.Unqualified,
];

export const LEVEL_CONFIG: { [key in Level]: { score: number; color: string; textColor: string; description: string } } = {
  [Level.Excellent]: { score: 5, color: 'bg-blue-500', textColor: 'text-blue-500', description: 'Excellent proficiency' },
  [Level.VeryGood]: { score: 4, color: 'bg-green-500', textColor: 'text-green-500', description: 'Very good proficiency' },
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
      [Level.Excellent]: 'The conversation runs smoothly and the candidate understands all that you say.',
      [Level.VeryGood]: 'The candidate understands what you say, and answers most questions without any trouble, but probably could not understand slang expressions from a native speaker.',
      [Level.Good]: 'The candidate understands what you say with some trouble, but can answer most of your questions while stopping to think for a bit. Their vocabulary isn’t expansive enough to hold a fast-paced conversation in English.',
      [Level.Fair]: 'The candidate repeatedly asks you to repeat what you just said, and goes back to their native language at times, but gives coherent answers.',
      [Level.Unqualified]: 'The candidate seems to barely understand spoken English. It’s certainly difficult to have a conversation in English with them.',
    },
  },
  {
    name: 'Fluency',
    weight: 0.3,
    description: 'Evaluates the flow and ease of speech.',
    levelDescriptions: {
      [Level.Excellent]: 'The candidate speaks naturally and confidently, with smooth and well-structured sentences. There are no long pauses or signs of hesitation.',
      [Level.VeryGood]: 'The candidate speaks easily and keeps the conversation flowing, though may pause briefly to find words or correct small mistakes.',
      [Level.Good]: 'The candidate can maintain a conversation but occasionally stops to think or reformulate sentences. Hesitation is noticeable but doesn’t block communication.',
      [Level.Fair]: 'The candidate struggles to keep sentences flowing and often breaks the conversation rhythm with long pauses or fillers (“uh”, “hmm”, etc.).',
      [Level.Unqualified]: 'The candidate speaks in broken sentences, frequently gets stuck, and is unable to maintain a coherent English conversation.',
    },
  },
  {
    name: 'Vocabulary',
    weight: 0.2,
    description: 'Measures the range and appropriate use of words.'
    levelDescriptions: {
      [Level.Excellent]: 'The candidate uses a wide range of vocabulary naturally and appropriately for different contexts, including idiomatic or nuanced expressions.',
      [Level.VeryGood]: 'The candidate uses good vocabulary and can express most ideas clearly, though might lack some specific or advanced terms.',
      [Level.Good]: 'The candidate can communicate basic and work-related ideas but tends to repeat words or rely on simple expressions.',
      [Level.Fair]: 'The candidate’s vocabulary is limited and makes it hard to explain ideas clearly. They often use incorrect or incomplete words.',
      [Level.Unqualified]: 'The candidate has very limited vocabulary and cannot express themselves beyond basic or memorized phrases.',
    },
  },
  {
    name: 'Pronunciation',
    weight: 0.15,
    description: 'Judges the clarity and accuracy of spoken sounds.',
    levelDescriptions: {
      [Level.Excellent]: 'The candidate’s pronunciation is clear, natural, and easily understandable. Minor accent traces don’t interfere with comprehension.',
      [Level.VeryGood]: 'The candidate’s accent is noticeable but doesn’t affect understanding. Words are pronounced clearly, and rhythm and stress are generally correct.',
      [Level.Good]: 'The candidate’s pronunciation requires some effort to understand but most words are still clear. Accent occasionally interferes with comprehension.',
      [Level.Fair]: 'The candidate’s pronunciation often makes comprehension difficult. Mispronounced words or incorrect stress patterns are frequent.',
      [Level.Unqualified]: 'The candidate’s pronunciation makes communication very difficult; many words are incomprehensible or require repetition to be understood.',
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
