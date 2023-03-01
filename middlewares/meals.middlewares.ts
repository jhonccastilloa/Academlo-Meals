import { NextFunction, Request, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import MealModel from '../models/meal.models';
import RestaurantModel from '../models/restaurant.model';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

const validMealById = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const meal = await MealModel.findOne({
      where: {
        id,
        status: 'available',
      },
      include: {
        model: RestaurantModel,
      },
    });
    if (!meal) return next(new AppError('meal not found', 404));

    req.meal = meal;
    next();
  }
);

const validMealByMealId = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { mealId} = req.body;
    const meal = await MealModel.findOne({
      where: {
        id: mealId,
        status: 'available',
      },
    });
    if (!meal) return next(new AppError('meal not found', 404));

    req.meal = meal;
    next();
  }
);
export { validMealById, validMealByMealId };
