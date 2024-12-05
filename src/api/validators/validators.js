import { body, param } from 'express-validator';
import { validatorMiddleware } from '../middlewares/validatorMiddleware.js';

export const idValidator = [
  param('id')
    .isMongoId()
    .withMessage('invalid id'),
  validatorMiddleware
]

export const registerValidator = [
  body('firstName')
    .notEmpty()
    .withMessage('first name required'),
  body('lastName')
    .notEmpty()
    .withMessage('last name required'),
  body('email')
    .notEmpty()
    .withMessage('email required'),
  body('password')
    .notEmpty()
    .withMessage('password required'),
  validatorMiddleware
]

export const loginValidator = [
  body('email')
    .notEmpty()
    .withMessage('email required'),
  body('password')
    .notEmpty()
    .withMessage('password required'),
  validatorMiddleware
]