import { NextFunction, Request, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import ReviewModel from '../models/reviews.model';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

const validReviewById = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { restaurantId, id } = req.params;
    const review = await ReviewModel.findOne({
      where: {
        restaurantId,
        id,
        status:"available"
      },
    });
    if (!review) return next(new AppError('Review not found', 404));
    req.review = review;
    next();
  }
);

const protectReviewOwner = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { review, sessionUser } = req;
    if (review.userId !== sessionUser.id) {
      return next(new AppError('You do not own this Review.', 401));
    }
    next();
  }
);
export { validReviewById, protectReviewOwner };
