import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { getAuth } from '@clerk/nextjs/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_P,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { code, language, systemPrompt } = req.body;

    if (!code || !language || !systemPrompt) {
      console.error('Missing required fields:', { code: !!code, language: !!language, systemPrompt: !!systemPrompt });
      return res.status(400).json({ 
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: 'error',
        content: 'Missing required fields'
      });
    }

    console.log('Making OpenAI request with:', {
      model: "gpt-4",
      hasApiKey: !!process.env.OPENAI_API_KEY_P,
      language,
      codeLength: code.length,
      promptLength: systemPrompt.length
    });

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
          content: "You are a code validator. Respond with ONLY 'PASS' or 'FAIL'. Pass means the code fully meets requirements, Fail means it doesn't." 
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

    return res.status(500).json({ 
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'error',
      content: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
} 