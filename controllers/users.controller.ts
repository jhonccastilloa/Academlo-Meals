import { NextFunction, Request, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import MealModel from '../models/meal.models';
import OrderModel from '../models/order.model';
import RestaurantModel from '../models/restaurant.model';
import UserModel from '../models/user.models';
import AppError from '../utils/appError';
import { compareEncrypt, encrypt } from '../utils/bcryptPassword';
import catchAsync from '../utils/catchAsync';
import { tokenSign } from '../utils/jwt';

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role = 'normal' } = req.body;
    const passwordEncrypt = await encrypt(password);
    const newUser = await UserModel.create({
      name,
      email,
      password: passwordEncrypt,
      role,
    });
    res.json({
      status: 'succes',
      message: 'the user was created succesfully',
      newUser,
    });
  }
);
const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      where: {
        email,
      },
    });
    if (!user) return next(new AppError('this account not exist', 404));

    const checkPassword = await compareEncrypt(password, user.password);
    if (!checkPassword)
      return next(new AppError('Incorrect email or password', 401));
    const token = tokenSign(user.id);
    res.json({ status: 'success', token, user });
  }
);

const updateUser = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { user } = req;
    const { name, email } = req.body;
    const newUser = await user.update({ name, email });
    res.json({
      status: 'succes',
      message: 'the user was edited succesfully',
      newUser,
    });
  }
);
const deleteUser = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { user } = req;
    await user.update({ status: 'unavailable' });
    res.json({ status: 'success', message: 'User was deleted successfully' });
  }
);

const findUserOrder = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { sessionUser } = req;
    const orders = await OrderModel.findAll({
      where: {
        userId: sessionUser.id,
      },
      include: [
        {
          model: MealModel,
          include: [
            {
              model: RestaurantModel,
            },
          ],
        },
      ],
    });
    res.json({ status: 'success', orders });
  }
);

const findUserOrderById = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { sessionUser } = req;
    const { id } = req.params;
    const order = await OrderModel.findAll({
      where: {
        userId: sessionUser.id,
        id,
      },
      include: [
        {
          model: MealModel,
          include: [
            {
              model: RestaurantModel,
            },
          ],
        },
      ],
    });
    console.log({order})
    if (!order.length) return next(new AppError('Order Not Found', 404));
    res.json({ status: 'success', order });
  }
);

export {
  signup,
  login,
  updateUser,
  deleteUser,
  findUserOrder,
  findUserOrderById,
};
