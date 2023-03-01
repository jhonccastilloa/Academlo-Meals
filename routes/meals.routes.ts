import { Router } from 'express';
import {
  createMeal,
  deleteMeal,
  findMeal,
  findMeals,
  updateMeal,
} from '../controllers/meals.controllers';
import { checkRol, protect } from '../middlewares/auth.middlewares';
import { validMealById } from '../middlewares/meals.middlewares';
import { validRestaurantById } from '../middlewares/restaurants.middlewares';

const router = Router();


router.get('/:id', validMealById, findMeal);
router.get('/', findMeals);

router.use(protect);

router.post('/:restaurantId',checkRol(['admin']), validRestaurantById, createMeal);
router.patch('/:id', checkRol(['admin']),validMealById, updateMeal);
router.delete('/:id', checkRol(['admin']),validMealById, deleteMeal);

export default router;
