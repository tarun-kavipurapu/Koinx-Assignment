// src/app.ts
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { errorHandler } from './middlewares/error.middleware';
import cronJob from './background-jobs/cryptoJob';

const app = express();
const httpServer = http.createServer(app);

// Middleware to parse JSON requests
app.use(express.json());

// Sample route
cronJob;
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express TypeScript Server!');
});

app.use(errorHandler);

export { httpServer };
