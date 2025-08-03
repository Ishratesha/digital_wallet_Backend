import { Wallet } from './wallet.model';

export const WalletService = {
  createWallet: async (userId: string, role: 'user' | 'agent') => {
    return Wallet.create({ userId, role });
  },

  getWalletByUser: async (userId: string) => {
    return Wallet.findOne({ userId });
  },

  updateBalance: async (userId: string, amount: number) => {
    return Wallet.findOneAndUpdate({ userId }, { $inc: { balance: amount } }, { new: true });
  },

  setBlocked: async (userId: string, isBlocked: boolean) => {
    return Wallet.findOneAndUpdate({ userId }, { isBlocked }, { new: true });
  },
};
