import { OpenAIService } from './openai';
import { EvaluationResult } from '../types/state';

const openAIService = new OpenAIService();

export class EvaluationService {
  static async evaluate(code: string, language: string, systemPrompt: string, challengeId: string): Promise<EvaluationResult> {
    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language, systemPrompt, challengeId }),
      });

      if (!response.ok) {
        const error = await response.json();
        if (response.status === 409) {
          throw new Error(error.content);
        }
        throw new Error(error.message || 'Evaluation failed');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.message.includes('already successfully completed')) {
        throw error;
      }
      return {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: 'error',
        content: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }
} 