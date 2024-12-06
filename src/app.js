import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import connectDB from './../config/db.js';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import appRouter from './api/routes/indexRouter.js';
import mongoose from 'mongoose';
import './api/services/passport.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    client: mongoose.connection.getClient()
  }) 
}))

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', appRouter);

app.all('*', (req, res, next)=> {
  return res.status(404).json({ status: "error", message: 'this resource is not available'});
})

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500)
  .json({ status: error.statusText || "error", message: error.message, code: error.statusCode || 500, data: null});
})

export default app;
