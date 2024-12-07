import { EvaluationResult } from '../types/state';

const AZURE_ENDPOINT = 'https://oai-playgrou-e1-p-1.openai.azure.com';
const DEPLOYMENT_NAME = 'gpt-4o';
const API_VERSION = '2024-08-01-preview';

export class OpenAIService {
  private apiKey: string;
  private endpoint: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.endpoint = `${AZURE_ENDPOINT}/openai/deployments/${DEPLOYMENT_NAME}/chat/completions?api-version=${API_VERSION}`;
  }

  async evaluateCode(code: string, language: string): Promise<EvaluationResult> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a code evaluation assistant. Analyze the code and provide feedback.',
            },
            {
              role: 'user',
              content: `Please evaluate this ${language} code:\n\n${code}`,
            },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: 'success',
        content: data.choices[0].message.content,
      };
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