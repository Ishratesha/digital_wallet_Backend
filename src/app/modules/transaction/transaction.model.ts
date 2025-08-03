import mongoose, { Schema } from 'mongoose';

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['add-money', 'withdraw', 'send-money','cash-in','cash-out'],
      required: true,
    },
    amount: { type: Number, required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model('Transaction', transactionSchema);
