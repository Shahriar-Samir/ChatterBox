import express from 'express';
import cors from 'cors';
import router from './app/routes/routes';
import globalErrorHandler from './app/middlewares/errorHandler';
import pageNotFoundHandler from './app/middlewares/pageNotFoundHandler';
import cookieParser from 'cookie-parser';

const app = express(); // Create Express instance first

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

// API routes
app.use('/api/v1', router);

// Error handling middlewares
app.use(globalErrorHandler);
app.use(pageNotFoundHandler);

export { app }; // Export app only after fully setting it up
