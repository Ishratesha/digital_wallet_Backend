import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../modules/user/user.model';
import AppError from './AppError';
import { envVars } from '../config/env'; // import envVars

export const auth = (role: 'USER' | 'ADMIN' | 'AGENT') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError(401, 'Unauthorized: Token missing');
      }

      const token = authHeader.split(' ')[1];
      // Use the correct secret
      const decoded = jwt.verify(token, envVars.JWT_ACCESS_SECRET) as { userId: string; role: string };
      console.log('Decoded token:', decoded);

      if (decoded.role !== role) {
        throw new AppError(403, 'Forbidden: Invalid role');
      }

      // Use userId from token, not _id
      const user = await User.findById(decoded.userId);
      console.log('Decoded user:', user);
      if (!user) {
        throw new AppError(401, 'Unauthorized: User not found');
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};