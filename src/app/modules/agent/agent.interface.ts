import { Types } from 'mongoose';

export interface IAgent {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  isSuspended: boolean;
  commissionEarned: number;
  createdAt?: Date;
  updatedAt?: Date;
}