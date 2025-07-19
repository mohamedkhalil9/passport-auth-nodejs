import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/appError.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
});

export const deleteUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { password, newPassword } = req.body;
});

export const sendVerifyEmail = asyncHandler();
export const verifyEmail = asyncHandler();
