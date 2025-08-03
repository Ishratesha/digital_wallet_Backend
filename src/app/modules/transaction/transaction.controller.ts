import { Request, Response } from 'express';
import { TransactionService } from './transaction.service';

export const TransactionController = {
  addMoney: async (req: Request, res: Response) => {
    console.log("user in add money", req.user)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user info found' });
    }

    const result = await TransactionService.addMoney(req.user._id, req.body.amount);
    res.status(200).json({ message: 'Money added', data: result });
  },

  withdrawMoney: async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user info found' });
    }

    const result = await TransactionService.withdrawMoney(req.user._id, req.body.amount);
    res.status(200).json({ message: 'Money withdrawn', data: result });
  },

  sendMoney: async (req: Request, res: Response) => {
    console.log("req.user", req.user)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user info found' });
    }

    const { phoneNumber, amount } = req.body;
    const result = await TransactionService.sendMoney(req.user._id, phoneNumber, amount);
    res.status(200).json({ message: 'Money sent', data: result });
  },

  myTransactions: async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user info found' });
    }

    const result = await TransactionService.getTransactions(req.user._id);
    res.status(200).json({ message: 'Transaction history', data: result });


  },

  cashIn: async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const { phoneNumber, amount } = req.body;
    const result = await TransactionService.cashInByAgent(req.user._id, phoneNumber, amount);
    res.status(200).json(result);
  },

  cashOut: async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const { receiverPhone, amount } = req.body;
    const result = await TransactionService.cashOut(req.user._id, receiverPhone, amount);
    res.status(200).json(result);
  },

};
