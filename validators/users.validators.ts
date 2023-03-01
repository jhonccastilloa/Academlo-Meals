import { body } from 'express-validator';
import validateField from '../middlewares/validateField.middlewares';

const validateUserCreate = [
  body('name', 'Make sure you have a correct name').exists().notEmpty(),
  body('email', 'Make sure you have a correct email')
    .exists()
    .notEmpty()
    .isEmail(),
  body('password', 'Make sure you have a correct password')
    .exists()
    .notEmpty(),
  validateField,
];

export default validateUserCreate