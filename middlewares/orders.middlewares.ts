import { NextFunction, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import OrderModel from '../models/order.model';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

const validOrderById = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await OrderModel.findOne({
      where: {
        id,
        status: 'active',
      },
    });
    if (!order) return next(new AppError('order not found', 404));

    req.order = order;
    next();
  }
);

const protectorderOwner = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { order, sessionUser } = req;
    if (order.userId !== sessionUser.id) {
      return next(new AppError('You do not own this Review.', 401));
    }
    next();
  }
);
export { validOrderById, protectorderOwner };
