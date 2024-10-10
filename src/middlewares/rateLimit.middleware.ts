import { rateLimit } from 'express-rate-limit';
import { ApiError } from '../utils/ApiError';

export const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50, // Limit each IP to 10000 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: any) => req.ip,
  handler: (_req, _res, next, options) => {
    next(
      new ApiError(
        options.statusCode || 429,
        `Too many requests. You are allowed ${options.max} requests per ${options.windowMs / 60000} minutes.`,
      ),
    );
  },
});
