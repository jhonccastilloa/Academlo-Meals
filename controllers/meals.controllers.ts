import { NextFunction, Request, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import MealModel from '../models/meal.models';
import RestaurantModel from '../models/restaurant.model';
import catchAsync from '../utils/catchAsync';

const createMeal = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, price } = req.body;
    const { restaurantId } = req.params;
    const newMeal = await MealModel.create({
      name,
      price,
      restaurantId: +restaurantId,
    });
    res.json({
      status: 'success',
      message: 'the meal was created succesfully',
      newMeal,
    });
  }
);

const findMeals = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const meals = await MealModel.findAll({
      where: {
        status: 'available',
      },
      include: {
        model: RestaurantModel,
      },
    });
    res.json({
      status: 'success',
      meals,
    });
  }
);

const findMeal = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { meal } = req;
    res.json({
      status: 'success',
      message: 'Meal found succesfully',
      meal,
    });
  }
);

const updateMeal = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { meal } = req;
    const { name, price } = req.body;
    const newMeal = await meal.update({
      name,
      price,
    });
    res.json({
      status: 'success',
      message: 'the meal was edited succesfully',
      newMeal,
    });
  }
);

const deleteMeal = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { meal } = req;
    await meal.update({ status: 'unavailable' });
    res.json({
      status: 'success',
      message: 'Meal was deleted successfully',
    });
  }
);

export { createMeal, findMeals, findMeal, updateMeal, deleteMeal };
