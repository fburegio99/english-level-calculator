import { Level, CategoryName } from './types';

export const LEVELS_ORDER: Level[] = [
  Level.Excellent,
  Level.VeryGood,
  Level.Good,
  Level.Fair,
  Level.Unqualified,
];

export const LEVEL_CONFIG: {
  [key in Level]: { score: number; color: string; textColor: string; description: string };
} = {
  [Level.Excellent]: { score: 5, color: 'bg-blue-500', textColor: 'text-blue-500', description: 'Excellent proficiency' },
  [Level.VeryGood]: { score: 4, color: 'bg-green-500', textColor: 'text-green-500', description: 'Very Good proficiency' },
  [Level.Good]: { score: 3, color: 'bg-yellow-500', textColor: 'text-yellow-500', description: 'Good proficiency' },
  [Level.Fair]: { score: 2, color: 'bg-orange-500', textColor: 'text-orange-500', description: 'Fair proficiency' },
  [Level.Unqualified]: { score: 1, color: 'bg-red-500', textColor: 'text-red-500', description: 'Unqualified' },
};

export const CATEGORIES: {
  name: CategoryName;
  weight: number;
  description: string;
  levelDescriptions: { [key in Level]: string };
}[] = [
  {
    name: 'General Understanding',
    weight: 0.30,
    description: 'Assesses comprehension of spoken English.',
    levelDescriptions: {
      [Level.Excellent]:
        'Understands everything with ease, including complex or fast-paced conversations, without needing clarification.',
      [Level.VeryGood]:
        'Understands almost everything, including most complex ideas, with only occasional need for clarification.',
      [Level.Good]:
        'Understands the main points of most conversations but may struggle with complex or detailed explanations.',
      [Level.Fair]:
        'Frequently needs repetition or rephrasing and may miss key parts of the conversation.',
      [Level.Unqualified]:
        'Struggles to understand even simple questions or basic conversation.',
    },
  },
  {
    name: 'Fluency',
    weight: 0.25,
    description: 'Evaluates the flow and ease of speech.',
    levelDescriptions: {
      [Level.Excellent]:
        'Speaks naturally and confidently, with a smooth flow and no noticeable hesitation.',
      [Level.VeryGood]:
        'Speaks clearly and keeps the conversation going, with only occasional pauses to find words.',
      [Level.Good]:
        'Can hold a conversation but pauses regularly to think or rephrase ideas.',
      [Level.Fair]:
        'Often breaks the flow of conversation with long pauses or filler words.',
      [Level.Unqualified]:
        'Struggles to form complete sentences and cannot maintain a conversation.',
    },
  },
  {
    name: 'Vocabulary',
    weight: 0.25,
    description: 'Measures the range and appropriate use of words.',
    levelDescriptions: {
      [Level.Excellent]:
        'Uses a wide range of vocabulary comfortably and can express ideas clearly in different situations.',
      [Level.VeryGood]:
        'Has a good range of vocabulary and can express most ideas, with occasional gaps.',
      [Level.Good]:
        'Uses basic, work-related vocabulary but may repeat words or struggle to express more complex ideas.',
      [Level.Fair]:
        'Has limited vocabulary and often struggles to express ideas clearly.',
      [Level.Unqualified]:
        'Has very basic vocabulary and cannot express ideas beyond simple phrases.',
    },
  },
  {
    name: 'Pronunciation',
    weight: 0.20,
    description: 'Judges the clarity and accuracy of spoken sounds.',
    levelDescriptions: {
      [Level.Excellent]:
        'Clear and natural pronunciation. Accent does not affect understanding at all.',
      [Level.VeryGood]:
        'Accent is noticeable but does not impact understanding.',
      [Level.Good]:
        'Generally understandable, but accent or mispronunciations sometimes require extra effort.',
      [Level.Fair]:
        'Pronunciation frequently makes understanding difficult.',
      [Level.Unqualified]:
        'Very difficult to understand. Frequent repetition is required.',
    },
  },
];

export const getOutcomeLevel = (score: number): Level | null => {
  if (score >= 4.5) return Level.Excellent;
  if (score > 3.5) return Level.VeryGood;
  if (score >= 2.5) return Level.Good;
  if (score >= 1.5) return Level.Fair;
  return Level.Unqualified;
};
