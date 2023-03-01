import { NextFunction, Request, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import RestaurantModel from '../models/restaurant.model';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

const validRestaurantById = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { restaurantId } = req.params;
    const restaurant = await RestaurantModel.findOne({
      where: {
        id:restaurantId,
        status: 'available',
      },
    });
    if (!restaurant) return next(new AppError('Restaurant not found', 404));
    req.restaurant = restaurant;
    next();
  }
);

export { validRestaurantById };
