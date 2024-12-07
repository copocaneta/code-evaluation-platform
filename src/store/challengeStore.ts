import { create } from 'zustand';
import { Challenge } from '../types/state';

const defaultChallenges: Challenge[] = [
  {
    id: 'basic',
    label: 'Basic',
    description: 'Write a function that returns "Hello, World!"',
    difficulty: 'basic',
    defaultLanguage: 'javascript',
    defaultCode: 'function helloWorld() {\n  // Your code here\n}',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    description: 'Create a function that reverses a string',
    difficulty: 'intermediate',
    defaultLanguage: 'javascript',
    defaultCode: 'function reverseString(str) {\n  // Your code here\n}',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: 'Implement a binary search tree',
    difficulty: 'advanced',
    defaultLanguage: 'typescript',
    defaultCode: 'class BinarySearchTree {\n  // Your code here\n}',
  },
];

interface ChallengeStore {
  challenges: Challenge[];
  activeChallenge: Challenge | null;
  setActiveChallenge: (challengeId: string) => void;
}

export const useChallengeStore = create<ChallengeStore>((set) => ({
  challenges: defaultChallenges,
  activeChallenge: defaultChallenges[0],
  setActiveChallenge: (challengeId) =>
    set((state) => ({
      activeChallenge: state.challenges.find((c) => c.id === challengeId) || state.activeChallenge,
    })),
})); 