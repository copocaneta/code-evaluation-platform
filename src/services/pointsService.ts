interface PointsResponse {
  points: number;
}

export class PointsService {
  static async awardPoints(points: number): Promise<number> {
    try {
      const response = await fetch('/api/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points }),
      });

      if (!response.ok) {
        throw new Error('Failed to award points');
      }

      const data: PointsResponse = await response.json();
      return data.points;
    } catch (error) {
      console.error('Error awarding points:', error);
      throw error;
    }
  }
} 