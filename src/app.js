import express from 'express';
import dotenv from 'dotenv';
import appRouter from './api/routes/indexRouter.js';

dotenv.config();

const app = express();

app.use('/api/v1', appRouter);

export default app;
