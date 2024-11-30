import express from 'express';
import dotenv from 'dotenv';
import appRouter from './api/routes/indexRouter.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api/v1', appRouter);

export default app;
