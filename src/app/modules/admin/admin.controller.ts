import { Request, Response } from 'express';
import { AdminService } from './admin.service';

export const AdminController = {
  getAllUsers: async (_req: Request, res: Response) => {
    const users = await AdminService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  },
  getAllTransactions: async (_req: Request, res: Response) => {
    const transactions = await AdminService.getAllTransactions();
    res.status(200).json({ success: true, data: transactions });
  },
  getAllWallets: async (_req: Request, res: Response) => {
    const wallets = await AdminService.getAllWallets();
    res.status(200).json({ success: true, data: wallets });
  },
  approveOrSuspendAgent: async (req: Request, res: Response) => {
    const { agentId } = req.params;
    const { isSuspended } = req.body; // true or false
    const agent = await AdminService.updateAgentStatus(agentId, isSuspended);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.status(200).json({ message: `Agent ${isSuspended ? 'suspended' : 'approved'} successfully`, data: agent });
  },
  blockWallet: async (req: Request, res: Response) => {
  const { walletId } = req.params;
  const { isBlocked } = req.body; // true or false
  const wallet = await AdminService.blockWallet(walletId, isBlocked);
  if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
  res.status(200).json({ message: `Wallet ${isBlocked ? 'blocked' : 'unblocked'} successfully`, data: wallet });
},
};