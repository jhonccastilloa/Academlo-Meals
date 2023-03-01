import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.models';
import { encrypt } from '../utils/bcryptPassword';
import catchAsync from '../utils/catchAsync';

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("error");
    
    const { name, email, password, role } = req.body;
    const passwordEncrypt = await encrypt(password);
    const newUser = await UserModel.create({
      name,
      email,
      password: passwordEncrypt,
      role,
    });
    res.json({
      status: 'succes',
      message: 'the user was created succesfully',
      newUser,
    });
  }
);

export { signup };
