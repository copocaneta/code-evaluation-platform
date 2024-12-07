import { NextApiRequest, NextApiResponse } from 'next';
import { RateLimiter } from 'limiter';

const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'minute',
});

export async function rateLimiterMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => Promise<void>
) {
  const remainingRequests = await limiter.removeTokens(1);

  if (remainingRequests < 0) {
    res.status(429).json({
      error: 'Too many requests. Please try again later.',
      retryAfter: 60,
    });
    return;
  }

  await next();
} 