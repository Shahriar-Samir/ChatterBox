import express from 'express';
import cors from 'cors';
import router from './app/routes/routes';
import globalErrorHandler from './app/middlewares/errorHandler';
import pageNotFoundHandler from './app/middlewares/pageNotFoundHandler';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// router
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);
// page not found handler
app.use(pageNotFoundHandler);

export default app;
