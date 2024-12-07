export type Difficulty = 'basic' | 'intermediate' | 'advanced';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
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