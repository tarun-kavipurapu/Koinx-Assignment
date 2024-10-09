// src/index.ts
import dotenv from 'dotenv';
import { httpServer } from './app';
import connectDB from './db/index';
import { fetchInsertData } from './background-jobs/crypto.service';

// Load environment variables from .env file
dotenv.config({
  path: './.env',
});

const startServer = () => {
  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    console.info(`📑 Visit the documentation at: http://localhost:${port}`);
    console.log(`⚙️  Server is running on port: ${port}`);
  });
};

const init = async () => {
  try {
    await connectDB();

    startServer();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if DB connection fails
  }
};

// Initialize the server
init();
