import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIService } from '../../services/openai';
import { rateLimiterMiddleware } from '../../middleware/rateLimiter';

const openAIService = new OpenAIService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await rateLimiterMiddleware(req, res, async () => {
      const { code, language } = req.body;

      if (!code || !language) {
        return res.status(400).json({ error: 'Code and language are required' });
      }

      const result = await openAIService.evaluateCode(code, language);
      res.status(200).json(result);
    });
  } catch (error) {
    console.error('Evaluation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
} 