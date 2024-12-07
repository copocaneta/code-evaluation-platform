import { EvaluationResult } from '../types/state';

const AZURE_ENDPOINT = 'https://oai-playgrou-e1-p-1.openai.azure.com';
const DEPLOYMENT_NAME = 'gpt-4o';
const API_VERSION = '2024-08-01-preview';

export class OpenAIService {
  private apiKey: string;
  private endpoint: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY || '';
    this.endpoint = `${AZURE_ENDPOINT}/openai/deployments/${DEPLOYMENT_NAME}/chat/completions?api-version=${API_VERSION}`;
  }

  async evaluateCode(code: string, language: string, systemPrompt: string): Promise<EvaluationResult> {
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
              content: systemPrompt,
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
      const content = data.choices[0].message.content;

      const status = this.determineEvaluationStatus(content);

      return {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status,
        content,
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

  private determineEvaluationStatus(content: string): 'success' | 'error' | 'warning' {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('fails') || 
        lowerContent.includes('incorrect') || 
        lowerContent.includes('error') || 
        lowerContent.includes('does not pass')) {
      return 'error';
    }
    
    if (lowerContent.includes('could be improved') || 
        lowerContent.includes('suggestion') || 
        lowerContent.includes('consider')) {
      return 'warning';
    }
    
    return 'success';
  }
} 