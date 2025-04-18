import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import OpenAI from 'openai';
import { rateLimiter } from '../../middleware/rateLimiter';
import { LeaderboardService } from '../../services/leaderboardService';

// Log the API key presence for debugging
console.log('OpenAI API Key present:', !!process.env.OPENAI_API_KEY_P);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_P,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ 
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: 'error',
        content: 'Method not allowed'
      });
    }

    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ 
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: 'error',
        content: 'Unauthorized'
      });
    }

    await rateLimiter.check(res, 3, '10 s');
    
    const { code, language, systemPrompt, challengeId } = req.body;

    if (!code || !language || !systemPrompt || !challengeId) {
      return res.status(400).json({ 
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: 'error',
        content: 'Missing required fields'
      });
    }

    // Check if user has already completed this challenge
    const hasCompleted = await LeaderboardService.hasCompletedChallenge(userId, challengeId);
    if (hasCompleted) {
      return res.status(409).json({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: 'warning',
        content: 'You have already successfully completed this challenge. Your previous solution has been recorded.'
      });
    }

    // First call for detailed evaluation
    const evaluationCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Please evaluate this ${language} code:\n\n${code}` }
      ],
      temperature: 0.7,
    });

    // Second call for pass/fail status
    const statusCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "You are a code validator. Respond with ONLY 'PASS' or 'FAIL'. Pass means the code fully meets requirements, Fail means it doesn't. Never provide solutions or code examples in your response." 
        },
        { 
          role: "user", 
          content: `Does this code meet the requirements?\nRequirements: ${systemPrompt}\nCode:\n${code}` 
        }
      ],
      temperature: 0.7,
    });

    const status = statusCompletion.choices[0]?.message?.content?.trim().toUpperCase() === 'PASS' 
      ? 'success' 
      : 'error';

    // If the solution is successful, mark the challenge as completed
    if (status === 'success') {
      await LeaderboardService.markChallengeCompleted(userId, challengeId);
    }

    return res.status(200).json({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status,
      content: evaluationCompletion.choices[0]?.message?.content || '',
    });
  } catch (error) {
    console.error('OpenAI API Error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      apiKey: !!process.env.OPENAI_API_KEY_P
    });

    // Ensure we always return a properly formatted JSON response
    return res.status(500).json({ 
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'error',
      content: error instanceof Error 
        ? error.message 
        : typeof error === 'string' 
          ? error 
          : 'An unknown error occurred',
    });
  }
} 