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
      // First call for detailed evaluation
      const evaluationResponse = await this.makeOpenAIRequest(
        systemPrompt,
        `Please evaluate this ${language} code:\n\n${code}`
      );

      // Second call specifically for pass/fail status
      const statusResponse = await this.makeOpenAIRequest(
        "You are a code validator. Respond with ONLY 'PASS' or 'FAIL'. Pass means the code fully meets requirements, Fail means it doesn't.",
        `Does this code meet the requirements?\nRequirements: ${systemPrompt}\nCode:\n${code}`
      );

      const status = this.determineStatus(statusResponse.choices[0].message.content);

      return {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status,
        content: evaluationResponse.choices[0].message.content,
      };
    } catch (error) {
      console.error('Error during code evaluation:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        apiKeyPresent: !!this.apiKey,
        endpoint: this.endpoint,
      });
      return {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: 'error',
        content: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  private async makeOpenAIRequest(systemPrompt: string, userPrompt: string) {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        console.error('OpenAI API Error:', {
          status: response.status,
          statusText: response.statusText,
          endpoint: this.endpoint,
          hasApiKey: !!this.apiKey,
        });
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('OpenAI Request Error:', error);
      throw error;
    }
  }

  private determineStatus(statusResponse: string): 'success' | 'error' | 'warning' {
    const normalizedResponse = statusResponse.trim().toUpperCase();
    return normalizedResponse === 'PASS' ? 'success' : 'error';
  }
} 