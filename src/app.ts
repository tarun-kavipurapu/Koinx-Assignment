// src/app.ts
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';

const app = express();
const httpServer = http.createServer(app);

// Middleware to parse JSON requests
app.use(express.json());

// Sample route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express TypeScript Server!');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export { httpServer };
