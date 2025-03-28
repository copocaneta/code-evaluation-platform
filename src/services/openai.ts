import { EvaluationResult } from '../types/state';

export class OpenAIService {
  async evaluateCode(code: string, language: string, systemPrompt: string, challengeId: string): Promise<EvaluationResult> {
    try {
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : 'http://localhost:3000';

      const response = await fetch(`${baseUrl}/api/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          systemPrompt,
          challengeId,
        }),
      });

      let errorMessage = '';
      try {
        const errorData = await response.text();
        try {
          const jsonError = JSON.parse(errorData);
          errorMessage = jsonError.message || jsonError.content || errorData;
        } catch {
          errorMessage = errorData;
        }
      } catch {
        errorMessage = 'Failed to read error response';
      }

      if (!response.ok) {
        throw new Error(errorMessage || `API request failed: ${response.status} ${response.statusText}`);
      }

      try {
        return await response.json();
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error during code evaluation:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      return {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: 'error',
        content: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }
} 