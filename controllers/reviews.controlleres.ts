import { NextFunction, Request, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import ReviewModel from '../models/reviews.model';
import catchAsync from '../utils/catchAsync';

const createReviews = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { comment, rating } = req.body;
    const { id: idUser } = req.sessionUser;
    const { restaurantId } = req.params;

    const review = await ReviewModel.create({
      userId: idUser,
      comment,
      rating,
      restaurantId: +restaurantId,
    });

    res.json({
      status: 'success',
      message: 'the review was created succesfully',
      review,
    });
  }
);
const updateReview = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { review } = req;
    const { comment, rating } = req.body;
   
    const newReview = await review.update({ comment, rating });
    res.json({
      status: 'success',
      message: 'the review was edited succesfully',
      newReview,
    });
  }
);

const deleteReview = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { review } = req;
    await review.update({ status: 'unavailable' });
    res.json({ status: 'success', message: 'review was deleted successfully' });
  }
);

export { createReviews, updateReview, deleteReview };
