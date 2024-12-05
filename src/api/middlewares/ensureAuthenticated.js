import AppError from './../utils/appError.js';

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  return next(new AppError("access denied", 403));
}

export default isAuthenticated;
