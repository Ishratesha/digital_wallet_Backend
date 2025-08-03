import { User } from '../user/user.model';
import { Transaction } from '../transaction/transaction.model';
import { Wallet } from '../wallet/wallet.model';

export const AdminService = {
  getAllUsers: async () => {
    return User.find().sort({ createdAt: -1 });
  },
  getAllTransactions: async () => {
    return Transaction.find().sort({ createdAt: -1 });
  },
  getAllWallets: async () => {
    return Wallet.find().sort({ createdAt: -1 });
  },
  updateAgentStatus: async (agentId: string, isApproved: boolean) => {
    return await User.findByIdAndUpdate(agentId, { isApproved }, { new: true });
  },
  blockWallet: async (walletId: string, isBlocked: boolean) => {
  return await Wallet.findByIdAndUpdate(walletId, { isBlocked }, { new: true });
},
};