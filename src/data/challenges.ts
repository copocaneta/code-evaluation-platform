import { ChallengeData } from '../types/challenge';

export const challengeData: ChallengeData = {
  challenges: [
    {
      id: 'hello-world',
      title: 'Hello World',
      difficulty: 'basic',
      order: 1,
      description: 'Write a function that returns "Hello, World!"',
      instructions: `
Create a function called \`helloWorld\` that:
- Takes no parameters
- Returns the string "Hello, World!"
      `,
      systemPrompt: 'You are evaluating a basic Hello World function. Check if it returns exactly "Hello, World!"',
      sampleInput: 'helloWorld()',
      expectedOutput: 'Hello, World!',
      tags: ['functions', 'strings', 'basic'],
      defaultLanguage: 'javascript',
      defaultCode: 'function helloWorld() {\n  // Your code here\n}',
    },
    {
      id: 'string-reverse',
      title: 'String Reversal',
      difficulty: 'intermediate',
      order: 2,
      description: 'Create a function that reverses a string',
      instructions: `
Create a function called \`reverseString\` that:
- Takes a string parameter
- Returns the string reversed
- Handles empty strings and single characters
      `,
      systemPrompt: 'You are evaluating a string reversal function. Check if it correctly reverses the input string.',
      sampleInput: 'reverseString("hello")',
      expectedOutput: 'olleh',
      tags: ['strings', 'algorithms', 'intermediate'],
      defaultLanguage: 'javascript',
      defaultCode: 'function reverseString(str) {\n  // Your code here\n}',
    },
    {
      id: 'binary-tree',
      title: 'Binary Search Tree',
      difficulty: 'advanced',
      order: 3,
      description: 'Implement a binary search tree with basic operations',
      instructions: `
Create a BinarySearchTree class with the following methods:
- insert(value): Inserts a new value
- find(value): Returns true if value exists
- remove(value): Removes a value
      `,
      systemPrompt: 'You are evaluating a binary search tree implementation. Test all required operations.',
      tags: ['data-structures', 'trees', 'advanced'],
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