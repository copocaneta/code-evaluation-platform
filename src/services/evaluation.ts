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
        throw new Error(error.message || 'Evaluation failed');
      }

      return await response.json();
    } catch (error) {
      return {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: 'error',
        content: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }
} 