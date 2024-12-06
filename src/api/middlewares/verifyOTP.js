import AppError from '../utils/appError.js';
import User from './../models/userModel.js';
import asyncWrapper from './asyncWrapper.js';

export const verifyOTP = asyncWrapper(async (req, res, next) => {
  const { OTP, email } = req.body;
  
  const user = await User.findOne({ email });
  if (user.otpExpire < Date.now() || user.OTP !== OTP) throw new AppError('OTP code is not valid', 409)

  next();
})
