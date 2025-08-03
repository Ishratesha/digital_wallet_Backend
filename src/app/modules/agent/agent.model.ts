import { Schema, model } from 'mongoose';
import { IAgent } from './agent.interface';

const agentSchema = new Schema<IAgent>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    isApproved: { type: Boolean, default: false },
    isSuspended: { type: Boolean, default: false },
    commissionEarned: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Agent = model<IAgent>('Agent', agentSchema);