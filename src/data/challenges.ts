import { ChallengeData } from '../types/challenge';

export const challengeData: ChallengeData = {
  challenges: [
    {
      id: 'hello-world',
      title: 'Hello World',
      description: 'Write a function that returns "Hello, World!"',
      difficulty: 'basic',
      defaultLanguage: 'javascript',
      defaultCode: 'function helloWorld() {\n  // Your code here\n}',
    },
    {
      id: 'string-reverse',
      title: 'String Reversal',
      description: 'Create a function that reverses a string',
      difficulty: 'intermediate',
      defaultLanguage: 'javascript',
      defaultCode: 'function reverseString(str) {\n  // Your code here\n}',
    },
    {
      id: 'binary-tree',
      title: 'Binary Search Tree',
      description: 'Implement a binary search tree with basic operations',
      difficulty: 'advanced',
      defaultLanguage: 'typescript',
      defaultCode: 'class BinarySearchTree {\n  // Your code here\n}',
    },
  ],
  metadata: {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    totalChallenges: 3,
  },
}; 