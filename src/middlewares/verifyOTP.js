import AppError from "../utils/appError.js";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import bcrypt from "bcrypt";

export const verifyOTP = asyncHandler(async (req, res) => {
  const { OTP, email } = req.body;

  const user = await User.findOne({ email });

  //const isMatch = await bcrypt.compare(OTP, user.OTP)

  if (user.otpExpire < Date.now() || user.OTP !== OTP)
    throw new AppError("OTP code is not valid", 409);

  //next();
  res.status(200).json({ status: "success", data: OTP });
});
