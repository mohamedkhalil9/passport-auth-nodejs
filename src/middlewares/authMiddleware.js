import AppError from "./../utils/appError.js";

export const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return next(new AppError("access denied", 403));
};

// export const authorize =
