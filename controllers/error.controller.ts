import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'fail';
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
  });
};

export default globalErrorHandler;
