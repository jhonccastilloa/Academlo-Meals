import { Router } from 'express';
import {
  deleteUser,
  login,
  signup,
  updateUser,
} from '../controllers/users.controller';
import { protect, protectAccountOwner } from '../middlewares/auth.middlewares';
import {
  validRepeatEmail,
  validUserById,
} from '../middlewares/users.middlewares';
import validateUserCreate from '../validators/users.validators';

const router = Router();

router.post('/signup', validateUserCreate, validRepeatEmail, signup);
router.post('/login', login);

router.use(protect);

router.patch(
  '/:id',
  validUserById,
  validRepeatEmail,
  protectAccountOwner,
  updateUser
);
router.delete('/:id', validUserById, protectAccountOwner, deleteUser);

export default router;
