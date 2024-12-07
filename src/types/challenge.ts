export type Difficulty = 'basic' | 'intermediate' | 'advanced';

export interface Challenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  order: number;
  description: string;
  instructions: string;
  systemPrompt: string;
  sampleInput?: string;
  expectedOutput?: string;
  tags: string[];
  defaultLanguage: string;
  defaultCode: string;
}

export interface ChallengeMetadata {
  version: string;
  lastUpdated: string;
  totalChallenges: number;
}

export interface ChallengeData {
  challenges: Challenge[];
  metadata: ChallengeMetadata;
} 