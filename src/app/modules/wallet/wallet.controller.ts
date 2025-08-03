import { Request, Response } from 'express';
//import { User } from '../user/user.interface';
//import catchAsync from '../../../shared/catchAsync';
import { WalletService } from './wallet.service';
import httpStatus from 'http-status';
import catchAsync from '../../utiles/catchAsync';

export const WalletController = {
  getWallet: catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'User not authenticated' });
    }
    const wallet = await WalletService.getWalletByUser(req.user._id);
    res.status(httpStatus.OK).json({ success: true, data: wallet });
  }),
};
