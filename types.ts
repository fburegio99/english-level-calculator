
export enum Level {
  Unqualified = 'Unqualified',
  Fair = 'Fair',
  Good = 'Good',
  VeryGood = 'Very Good',
  Excellent = 'Excellent',
}

export type CategoryName = 'General Understanding' | 'Fluency' | 'Vocabulary' | 'Pronunciation';

export type Selections = {
  [key in CategoryName]?: Level;
};
