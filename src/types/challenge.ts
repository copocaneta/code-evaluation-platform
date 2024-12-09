export interface Challenge {
  id: string;
  title: string;
  description: string;
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