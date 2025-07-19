import User from "./../models/userModel.js";
import asyncHandler from "./../middlewares/asyncHandler.js";
import appError from "./../utils/appError.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendResetMail } from "../utils/sendResetMail.js";

const register = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    dateOfBirth,
    gender,
    phone,
    country,
    address,
  } = req.body;

  const user = await User.findOne({ email: email });
  if (user) throw new appError("user aleardy existed", 409);

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    dateOfBirth,
    gender,
    phone,
    country,
    address,
  });

  res.status(201).json({ status: "success", data: newUser });
});

const login = asyncHandler(async (req, res) => {
  const { user } = req;
  req.login(user, (err) => {
    if (err) throw new appError(err.message, 500);

    res.status(200).json({ id: user._id, email: user.email });
  });
});

const logout = asyncHandler(async (req, res) => {
  req.logout((err) => {
    if (err) throw new appError(err.message, 500);

    res.sendStatus(204);
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new appError("user not found", 404);

  const otp = crypto.randomInt(100000, 1000000).toString();

  //const hashedOTP = await bcrypt.hash(OTP, 10);
  user.otp = otp;
  user.otpExpire = Date.now() + 1000 * 60 * 5;
  await user.save();

  try {
    sendResetMail(email, otp);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ status: "success", data: user.email });
});

// export const verifyOtp

const resetPassword = asyncHandler(async (req, res) => {
  const { OTP } = req.params;

  const user = await User.findOne({ OTP, otpExpire: { $gt: Date.now() } });
  if (!user) throw new appError("OTP is invalid or has expired", 400);

  const { newPassword, confirmNewPassword } = req.body;
  if (newPassword !== confirmNewPassword)
    throw new appError("password don't match");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.OTP = undefined;
  user.otpExpire = undefined;
  await user.save();

  res.status(200).json({ status: "success", data: user.email });
});

export { register, login, logout, forgotPassword, resetPassword };
