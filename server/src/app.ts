import express from 'express';
import cors from 'cors';
import router from './app/routes/routes';
import globalErrorHandler from './app/middlewares/errorHandler';
import pageNotFoundHandler from './app/middlewares/pageNotFoundHandler';
import cookieParser from 'cookie-parser';

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(cookieParser());

// router
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);
// page not found handler
app.use(pageNotFoundHandler);

export default app;
