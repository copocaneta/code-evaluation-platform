import { EvaluationResult } from '../types/state';

export class OpenAIService {
  async evaluateCode(code: string, language: string, systemPrompt: string): Promise<EvaluationResult> {
    try {
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : 'http://localhost:3000';

      console.log('Making API request to:', `${baseUrl}/api/evaluate`);

      const response = await fetch(`${baseUrl}/api/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          systemPrompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API Response Error:', {
          status: response.status,
          statusText: response.statusText,
          data: errorData
        });
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
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