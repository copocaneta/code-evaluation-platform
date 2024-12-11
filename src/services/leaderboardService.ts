import { createClient } from '@supabase/supabase-js';

interface LeaderboardRow {
  user_id: string;
  username: string;
  points: number;
  avatar_url: string | null;
  updated_at: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  points: number;
  avatarUrl?: string;
}

const supabase = createClient<{ leaderboard: LeaderboardRow }>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export class LeaderboardService {
  static async initTable() {
    // Table creation is handled in Supabase dashboard
    return;
  }

  static async addPoints(userId: string, username: string, points: number, avatarUrl?: string) {
    const { data, error } = await supabase
      .from('leaderboard')
      .upsert({
        user_id: userId,
        username,
        points: points,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString()
      })
      .select('points')
      .single();

    if (error) throw error;
    return data?.points ?? points;
  }

  static async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('user_id, username, points, avatar_url')
      .order('points', { ascending: false })
      .limit(100);

    if (error) throw error;
    
    return (data || []).map(row => ({
      userId: row.user_id,
      username: row.username,
      points: row.points,
      avatarUrl: row.avatar_url
    }));
  }
} 