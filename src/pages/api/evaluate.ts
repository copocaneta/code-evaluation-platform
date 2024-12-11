import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { OpenAIService } from '../../services/openai';
import { rateLimiter } from '../../middleware/rateLimiter';

const openAIService = new OpenAIService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = getAuth(req);
  
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await rateLimiter.check(res, 3, '10 s');

    const { code, language, systemPrompt } = req.body;

    if (!code || !language || !systemPrompt) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await openAIService.evaluateCode(code, language, systemPrompt);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
} 