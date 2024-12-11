export interface Challenge {
  id: string;
  title: string;
  description: string;
  defaultLanguage: string;
  defaultCode: string;
  initialCode: string;
}

export interface ChallengeData {
  challenges: Challenge[];
  metadata: {
    version: string;
    lastUpdated: string;
    totalChallenges: number;
  };
} 