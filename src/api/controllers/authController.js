import User from './../models/userModel.js';
import asyncWrapper from './../middlewares/asyncWrapper.js';
import appError from './../utils/appError.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendResetMail } from '../utils/sendResetMail.js';

const register = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password, role, dateOfBirth, gender, phone, country, address } = req.body;

  const user = await User.findOne({ email: email });
  if (user) throw new appError("user aleardy existed", 409);

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ firstName, lastName, email, password: hashedPassword, role, dateOfBirth, gender, phone, country, address });

  res.status(201).json({ status: "success", data: newUser });
})

const login = asyncWrapper(async (req, res) => { 
  const { user } = req;
  req.login(user, (err) => {
    if (err) throw new appError(err.message , 500)

    res.status(200).json({ id: user._id,  email: user.email })
  })
})

const logout = asyncWrapper(async (req, res) => {
  req.logout((err) => {
    if (err) throw new appError(err.message, 500);

    res.sendStatus(204)
  })
})

const forgotPassword = asyncWrapper(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new appError('user not found', 404);

  const OTP = crypto.randomInt(1000, 10000).toString();
  const otpExpire = Date.now() + 60000;

  user.OTP = OTP;
  user.otpExpire = otpExpire;
  await user.save();

  sendResetMail(email, OTP);
  
  res.status(200).json({ status: 'success' })
})

const resetPassword = asyncWrapper(async (req, res) => {
  const { email, newPassword, confirmNewPassword } = req.body;
  if (newPassword !== confirmNewPassword) throw new appError("password don't match")

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const user = await User.findOne({ email });
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ status: "success", data: user });
})

export { register, login, logout, forgotPassword, resetPassword }
