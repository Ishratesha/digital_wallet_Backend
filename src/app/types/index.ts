import{ UserRole } from '../modules/user/user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        phoneNumber: string;
        role: UserRole;
      };
    }
  }
}
