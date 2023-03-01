import { Router } from 'express';
import {
  cancelledOrder,
  completedOrder,
  createOrder,
  myOrders,
} from '../controllers/orders.controller';
import { protect } from '../middlewares/auth.middlewares';
import { validMealByMealId } from '../middlewares/meals.middlewares';
import {
  protectorderOwner,
  validOrderById,
} from '../middlewares/orders.middlewares';

const router = Router();

router.use(protect);

router.post('/', validMealByMealId, createOrder);

router.get('/me', myOrders);
router.patch('/:id', validOrderById, protectorderOwner, completedOrder);
router.delete('/:id', validOrderById, protectorderOwner, cancelledOrder);

export default router;
