import { ChallengeData, Challenge } from '../types/challenge';
import { challengeData } from '../data/challenges';

class ChallengeLoader {
  private data: ChallengeData;

  constructor() {
    this.data = this.validateChallengeData(challengeData);
  }

  private validateChallengeData(data: ChallengeData): ChallengeData {
    // Validate required fields
    data.challenges.forEach((challenge) => {
      const requiredFields: (keyof Challenge)[] = [
        'id',
        'title',
        'difficulty',
        'order',
        'description',
        'instructions',
        'systemPrompt',
        'tags',
        'defaultLanguage',
        'defaultCode',
      ];

      requiredFields.forEach((field) => {
        if (!challenge[field]) {
          throw new Error(`Challenge ${challenge.id} is missing required field: ${field}`);
        }
      });
    });

    // Sort challenges by order
    data.challenges.sort((a, b) => a.order - b.order);

    return data;
  }

  public getChallenges(): Challenge[] {
    return this.data.challenges;
  }

  public getChallenge(id: string): Challenge | undefined {
    return this.data.challenges.find((c) => c.id === id);
  }

  public getChallengesByDifficulty(difficulty: Challenge['difficulty']): Challenge[] {
    return this.data.challenges.filter((c) => c.difficulty === difficulty);
  }

  public getChallengesByTags(tags: string[]): Challenge[] {
    return this.data.challenges.filter((c) => 
      tags.some((tag) => c.tags.includes(tag))
    );
  }

  public getMetadata() {
    return this.data.metadata;
  }
}

export const challengeLoader = new ChallengeLoader(); 