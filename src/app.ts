// src/app.ts
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { errorHandler } from './middlewares/error.middleware';
import { fetchCryptoData } from './background-jobs/crypto.service';

const app = express();
const httpServer = http.createServer(app);

// Middleware to parse JSON requests
app.use(express.json());

// Sample route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express TypeScript Server!');
});

app.use(errorHandler);

export { httpServer };
