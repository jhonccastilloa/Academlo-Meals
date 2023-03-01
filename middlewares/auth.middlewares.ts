import { NextFunction,  Response } from 'express';
import { RequestExt } from '../interfaces/types';
import UserModel from '../models/user.models';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { verifyToken } from '../utils/jwt';

const protect = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer'))
      return next(
        new AppError('You are not logged in!  please log in to get acess', 401)
      );
    const token = authorization.split(' ')[1];
    const decoded = verifyToken(token);
    const user = await UserModel.findOne({
      where: {
        id: decoded.id,
        status: 'available',
      },
    });
    if (!user)
      return next(
        new AppError('The owner of this token it not longer available', 401)
      );
    req.sessionUser = user;
    next();
  }
);

const checkRol =
  (roles: string[]): any =>
  (req: RequestExt, res: Response, next: NextFunction) => {
    const { role } = req.sessionUser;
    if (!roles.includes(role)) {
      return next(
        new AppError('You do not have permission to perfom this action.!', 403)
      );
    }
    next();
  };

const protectAccountOwner = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { user, sessionUser } = req;
    if (user.id !== sessionUser.id) {
      return next(new AppError('You do not own this account.', 401));
    }
    next();
  }
);
export { protect, protectAccountOwner, checkRol };
