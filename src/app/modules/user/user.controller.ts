import { Request, Response } from 'express';
import httpStatus from 'http-status';
//import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import { IUser } from './user.interface';
import catchAsync from '../../utiles/catchAsync';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { role } = req.body;

  // prevent public registration for ADMIN or SUPER_ADMIN
  if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: 'You are not allowed to register as ADMIN or SUPER_ADMIN',
    });
  }

  const user = await UserService.createUser(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'User registered successfully',
    data: user,
  });
});

export const UserController = {
  registerUser,
};
