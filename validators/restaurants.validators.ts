import { body } from 'express-validator';
import validateField from '../middlewares/validateField.middlewares';

const validateRestaurantCreate = [
  body('name', 'Make sure you have a correct name').exists().notEmpty(),
  body('address', 'Make sure you have a correct address').exists().notEmpty(),
  body('rating', 'Make sure you have a correct rating')
    .exists()
    .notEmpty()
    .isNumeric(),
  validateField,
];

export default validateRestaurantCreate;
