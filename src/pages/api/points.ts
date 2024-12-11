import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient as clerk } from '@clerk/nextjs/server';
import { LeaderboardService } from '../../services/leaderboardService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { points } = req.body;
  if (!points || typeof points !== 'number') {
    return res.status(400).json({ message: 'Invalid points value' });
  }

  try {
    const client = await clerk();
    const user = await client.users.getUser(userId);
    const newPoints = await LeaderboardService.addPoints(
      userId,
      user.firstName || 'Anonymous',
      points,
      user.imageUrl
    );

    res.status(200).json({ points: newPoints });
  } catch (error) {
    console.error('Error adding points:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 