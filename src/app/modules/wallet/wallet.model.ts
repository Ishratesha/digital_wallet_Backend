
import { Schema, model } from 'mongoose';
import { IWallet } from './wallet.interface';

const walletSchema = new Schema<IWallet>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // each user has exactly one wallet
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Wallet = model<IWallet>('Wallet', walletSchema);
