import { body } from 'express-validator';
import validateField from '../middlewares/validateField.middlewares';

const validateRestaurantCreate = [
  body('name', 'Make sure you have a correct name').exists().notEmpty(),
  body('price', 'Make sure you have a correct price')
    .exists()
    .notEmpty()
    .isNumeric(),
  validateField,
];

export default validateRestaurantCreate;
