import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { errorHandler } from './middlewares/error.middleware';
import { rateLimiter } from './middlewares/rateLimit.middleware';
import cronJob from './background-jobs/cryptoJob';
import cryptoRouter from './routes/crypto.router';
import morganMiddleware from './logger/morgon.logger';

const app = express();
const httpServer = http.createServer(app);

// Middleware to parse JSON requests
app.use(express.json());
app.use(morganMiddleware);

// Apply rate limiting middleware globally
app.use(rateLimiter);

// Cron job setup
cronJob;

// Routes
app.use('/', cryptoRouter);

// Error handler middleware (should be last)
//@ts-ignore
app.use(errorHandler);

export { httpServer };
