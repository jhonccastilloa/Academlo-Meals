import { NextFunction, Request, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import RestaurantModel from '../models/restaurant.model';
import catchAsync from '../utils/catchAsync';

const createRestaurant = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, rating } = req.body;
    const newRestaurant = await RestaurantModel.create({
      name,
      address,
      rating,
    });
    res.json({
      status: 'success',
      message: 'the restauran was created succesfully',
      newRestaurant,
    });
  }
);
const findRestaurants = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Restaurants = await RestaurantModel.findAll({
      where: {
        status: 'available',
      },
    });
    res.json({
      status: 'success',
      Restaurants,
    });
  }
);
const findRestaurant = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { restaurant } = req;
    res.json({
      status: 'success',
      message: 'Restaurant found succesfully',
      restaurant,
    });
  }
);
const updateRestaurant = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { restaurant } = req;
    const { name, address } = req.body;
    const newRestaurant = await restaurant.update({
      name,
      address,
    });
    res.json({
      status: 'success',
      message: 'the restaurant was edited succesfully',
      newRestaurant,
    });
  }
);
const deleteRestaurant = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { restaurant } = req;
    await restaurant.update({ status: 'unavailable' });
    res.json({
      status: 'success',
      message: 'Restaurant was deleted successfully',
    });
  }
);

export {
  createRestaurant,
  findRestaurants,
  findRestaurant,
  deleteRestaurant,
  updateRestaurant,
};
