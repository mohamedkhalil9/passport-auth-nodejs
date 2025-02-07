import express from 'express';
import 'dotenv/config.js';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './api/services/passport.js';
import cors from 'cors';
import connectDB from './../config/db.js';
import appRouter from './api/routes/indexRouter.js';

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
