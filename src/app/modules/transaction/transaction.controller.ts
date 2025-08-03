import { Request, Response } from 'express';
import { TransactionService } from './transaction.service';
import AppError from '../../middlewares/AppError';
import httpStatus from 'http-status-codes';

export const TransactionController = {
  addMoney: async (req: Request, res: Response) => {
    console.log("user in add money", req.user)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user info found' });
    }

    const result = await TransactionService.addMoney(req.user._id, req.body.amount, req.body.password);
    res.status(200).json({ message: 'Money added', data: result });
  },

  withdrawMoney: async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user info found' });
    }

    const result = await TransactionService.withdrawMoney(req.user._id, req.body.amount,req.body.password);
    res.status(200).json({ message: 'Money withdrawn', data: result });
  },

  sendMoney: async (req: Request, res: Response) => {
    console.log("req.user", req.user)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user info found' });
    }

    const { phoneNumber, amount,password } = req.body;
    const result = await TransactionService.sendMoney(req.user._id, phoneNumber, amount,password);
    res.status(200).json({ message: 'Money sent', data: result });
  },

  // myTransactions: async (req: Request, res: Response) => {
  //   if (!req.user) {
  //     return res.status(401).json({ message: 'Unauthorized: No user info found' });
  //   }

  //   const result = await TransactionService.getTransactions(req.user._id);
  //   res.status(200).json({ message: 'Transaction history', data: result });


  // },
  myTransactions: async (req: Request, res: Response, next: Function) => { // Use AuthRequest here
    try {
      // Check if user is authenticated and _id is available
      if (!req.user || !req.user._id) {
        // Use your AppError for consistency and proper error handling
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized: User information not found after authentication.');
      }

      // Pass the userId (as string) to the service
      const result = await TransactionService.getTransactions(req.user._id.toString());

      res.status(httpStatus.OK).json({
        success: true, // It's good practice to include a success flag
        message: 'Transaction history fetched successfully!',
        data: result,
      });
    } catch (error: any) {
      // Catch any errors (e.g., from service or AppError) and pass to global error handler
      next(error);
    }
  },
  userTransactionHistory: async (req: Request, res: Response, next: Function) => {
    try {
      if (!req.user || !req.user._id) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized: User information not found after authentication.');
      }

      const { userId } = req.params; // Assuming userId is passed as a route parameter
      const result = await TransactionService.getUserTransactionHistory(userId);

      res.status(httpStatus.OK).json({
        success: true,
        message: 'User transaction history fetched successfully!',
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  },

  cashIn: async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const { phoneNumber, amount,password } = req.body;
    const result = await TransactionService.cashInByAgent(req.user._id, phoneNumber, amount,password);
    res.status(200).json(result);
  },

  cashOut: async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const { receiverPhone, amount,password } = req.body;
    const result = await TransactionService.cashOut(req.user._id, receiverPhone, amount,password);
    res.status(200).json(result);
  },
  agentTransactions: async (req: Request, res: Response, next: Function) => {
    try {
      if (!req.user || !req.user._id) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized: User information not found after authentication.');
      }

      const result = await TransactionService.getAgentTransactions(req.user._id.toString());

      res.status(httpStatus.OK).json({
        success: true,
        message: 'Agent transaction history fetched successfully!',
        data: result,
      });
    } catch (error: any) {
      next(error);
    }

  }

};
