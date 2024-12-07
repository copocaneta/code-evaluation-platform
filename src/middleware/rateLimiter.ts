import { NextApiRequest, NextApiResponse } from 'next';

export class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private refillRate: number;
  private capacity: number;

  constructor(capacity: number, refillRate: number) {
    this.tokens = capacity;
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }

  async check(res: NextApiResponse, cost: number, period: string): Promise<boolean> {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    this.tokens = Math.min(this.capacity, this.tokens + timePassed * this.refillRate);
    this.lastRefill = now;

    if (this.tokens < cost) {
      res.status(429).json({ message: 'Too many requests' });
      return false;
    }

    this.tokens -= cost;
    return true;
  }
}

export const rateLimiter = new RateLimiter(10, 0.1); // 10 tokens, refill 1 token every 10 seconds

export async function rateLimiterMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => Promise<void>
) {
  const remainingRequests = await rateLimiter.check(res, 1, 'minute');

  if (!remainingRequests) {
    return;
  }

  await next();
} 