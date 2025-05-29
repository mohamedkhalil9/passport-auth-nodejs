import AppError from "./../utils/appError.js";

const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return next(new AppError("access denied", 403));
};

export default authenticate;
