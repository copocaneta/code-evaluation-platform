import { ChallengeData } from '../types/challenge';
import challengeJson from './challenges.json';

export const challengeData: ChallengeData = {
  ...challengeJson,
  metadata: {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    totalChallenges: challengeJson.challenges.length
  }
}; 