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
  blockWallet: async (walletId: string, isBlocked: boolean) => {
  return await Wallet.findByIdAndUpdate(walletId, { isBlocked }, { new: true });
},
};