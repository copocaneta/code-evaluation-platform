import { NextApiRequest, NextApiResponse } from 'next';
import { LeaderboardService } from '../../services/leaderboardService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const leaderboard = await LeaderboardService.getLeaderboard();
    return res.status(200).json(leaderboard);
  }

  res.status(405).json({ message: 'Method not allowed' });
} 