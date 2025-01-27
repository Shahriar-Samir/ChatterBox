import express from 'express';
import cors from 'cors';
import router from './app/routes/routes';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// router
app.use('/api/v1', router);

export default app;
