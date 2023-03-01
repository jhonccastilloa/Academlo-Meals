import { NextFunction, Request, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import MealModel from '../models/meal.models';
import OrderModel from '../models/order.model';
import RestaurantModel from '../models/restaurant.model';
import catchAsync from '../utils/catchAsync';

const createOrder = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { quantity, mealId } = req.body;
    const { meal, sessionUser } = req;
    const totalPrice = quantity * meal.price;
    const newOrder = await OrderModel.create({
      mealId,
      userId: sessionUser.id,
      totalPrice,
      quantity,
    });
    res.json({
      status: 'success',
      message: 'the order was created succesfully',
      newOrder,
    });
  }
);

const myOrders = catchAsync(
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
    res.json({
      status: 'success',
      message: 'the order was created succesfully',
      orders,
    });
  }
);

const completedOrder = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { order } = req;
    const editOrder = await order.update({ status: 'completed' });
    res.json({
      status: 'success',
      message: 'the order was completed succesfully',
      editOrder,
    });
  }
);
const cancelledOrder = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { order } = req;
    const editOrder = await order.update({ status: 'cancelled' });
    res.json({
      status: 'success',
      message: 'the order was cancelled succesfully',
      editOrder,
    });
  }
);
export { createOrder, myOrders, completedOrder, cancelledOrder };
