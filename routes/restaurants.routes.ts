import { Router } from 'express';
import {
  createRestaurant,
  deleteRestaurant,
  findRestaurant,
  findRestaurants,
  updateRestaurant,
} from '../controllers/restaurants.controller';
import {
  createReviews,
  deleteReview,
  updateReview,
} from '../controllers/reviews.controlleres';
import { checkRol, protect } from '../middlewares/auth.middlewares';
import { validRestaurantById } from '../middlewares/restaurants.middlewares';
import {
  protectReviewOwner,
  validReviewById,
} from '../middlewares/reviews.middlewares';
import validateRestaurantCreate from '../validators/restaurants.validators';

const router = Router();

router.get('/', findRestaurants);
router.get('/:restaurantId', validRestaurantById, findRestaurant);

router.use(protect);

router.patch(
  '/:restaurantId',
  checkRol(['admin']),
  validRestaurantById,
  updateRestaurant
);
router.delete(
  '/:restaurantId',
  checkRol(['admin']),
  validRestaurantById,
  deleteRestaurant
);
router.post(
  '/',
  checkRol(['admin']),
  validateRestaurantCreate,
  createRestaurant
);

router.post('/reviews/:restaurantId', validRestaurantById, createReviews);
router.patch(
  '/reviews/:restaurantId/:id',
  validRestaurantById,
  validReviewById,
  protectReviewOwner,
  updateReview
);
router.delete(
  '/reviews/:restaurantId/:id',
  validRestaurantById,
  validReviewById,
  protectReviewOwner,
  deleteReview
);

export default router;
