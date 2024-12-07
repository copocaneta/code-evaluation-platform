import { Difficulty } from '../types/challenge';

export const getDifficultyColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case 'basic':
      return 'green';
    case 'intermediate':
      return 'yellow';
    case 'advanced':
      return 'red';
    default:
      return 'gray';
  }
}; 