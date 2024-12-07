import { OpenAIService } from './openai';
import { EvaluationResult } from '../types/state';

const openAIService = new OpenAIService();

export class EvaluationService {
  static async evaluate(code: string, language: string, systemPrompt: string): Promise<EvaluationResult> {
    return openAIService.evaluateCode(code, language, systemPrompt);
  }
} 