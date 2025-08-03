import { Transaction } from './transaction.model';
import { Wallet } from '../wallet/wallet.model';
import mongoose from 'mongoose';
import AppError from '../../middlewares/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status-codes';

export const TransactionService = {
  addMoney: async (userId: string, amount: number) => {
    console.log("user id in add money service",userId)
    const wallet = await Wallet.findOne({ userId: userId });

    if (!wallet || wallet.isBlocked) throw new Error('Wallet not available');

    wallet.balance += amount;
    await wallet.save();

    await Transaction.create({
      type: 'add-money',
      amount,
      receiver: userId,
    });

    return { balance: wallet.balance };
  },

  withdrawMoney: async (userId: string, amount: number) => {
    const wallet = await Wallet.findOne({ userId: userId });

    if (!wallet || wallet.isBlocked) throw new Error('Wallet not available');
    if (wallet.balance < amount) throw new Error('Insufficient balance');

    wallet.balance -= amount;
    await wallet.save();

    await Transaction.create({
      type: 'withdraw',
      amount,
      sender: userId,
    });

    return { balance: wallet.balance };
  },

  sendMoney: async (senderId: string, receiverPhone: string, amount: number) => {
    console.log("senderId",senderId);
    console.log("receiverPhone",receiverPhone);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const senderWallet = await Wallet.findOne({ userId: senderId }).session(session);
      const receiverUser = await mongoose.model('User').findOne({ phoneNumber: receiverPhone }).session(session);
      console.log("receiverUser",receiverUser)

      if (!senderWallet || senderWallet.isBlocked) throw new Error('Sender wallet not available');
      if (!receiverUser) throw new Error('Receiver user not found');

      const receiverWallet = await Wallet.findOne({ userId: receiverUser._id }).session(session);

      if (!receiverWallet || receiverWallet.isBlocked) throw new Error('Receiver wallet not available');
      if (senderWallet.balance < amount) throw new Error('Insufficient balance');

      senderWallet.balance -= amount;
      receiverWallet.balance += amount;

      await senderWallet.save({ session });
      await receiverWallet.save({ session });

      await Transaction.create([{
        type: 'send-money',
        amount,
        sender: senderId,
        receiver: receiverUser._id,
      }], { session });

      await session.commitTransaction();
      session.endSession();

      return { senderBalance: senderWallet.balance };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  getTransactions: async (userId: string) => {
    return await Transaction.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ createdAt: -1 });
},

cashInByAgent: async (
  agentId: string,
  targetPhoneNumber: string,
  amount: number
) => {
    const targetUser = await User.findOne({ phoneNumber: targetPhoneNumber });
    if (!targetUser) throw new AppError(404, "Target user not found");
  
    const targetWallet = await Wallet.findOne({ userId: targetUser._id });
    if (!targetWallet) throw new AppError(404, "Target wallet not found");
  
    // Optional: Save commission for agent
    const commissionRate = 0.01;
    const commissionAmount = amount * commissionRate;
  
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      targetWallet.balance += amount;
      await targetWallet.save({ session });
  
      await Transaction.create([{
        type: 'cash-in',
        amount,
        from: agentId,
        to: targetUser._id,
        initiatedBy: 'agent'
      }], { session });
  
      // Optional: Record commission for agent
      // await Commission.create({ agent: agentId, amount: commissionAmount });
  
      await session.commitTransaction();
      session.endSession();
  
      return { message: 'Cash-in successful', balance: targetWallet.balance };
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  },
  cashOut: async (senderId: string, receiverPhone: string, amount: number) => {
  // Find agent by phone number
  const agentUser = await User.findOne({ phoneNumber: receiverPhone });
  if (!agentUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'Agent not found');
  }
  if (agentUser.role !== 'AGENT') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Receiver is not an agent');
  }

  // Find sender (user) wallet
  const senderWallet = await Wallet.findOne({ userId: senderId });
  if (!senderWallet || senderWallet.balance < amount) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient balance in user wallet');
  }

  // Find agent wallet
  const agentWallet = await Wallet.findOne({ userId: agentUser._id });
  if (!agentWallet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Agent wallet not found');
  }

  // Transaction
  senderWallet.balance -= amount;
  agentWallet.balance += amount;
  await senderWallet.save();
  await agentWallet.save();

  // Record transaction
  await Transaction.create({
    sender: senderId,
    receiver: agentUser._id,
    amount,
    type: 'cash-out',
  });

  return {
    message: 'Cash-out successful',
    remainingBalance: senderWallet.balance,
  };
},
};
  
  