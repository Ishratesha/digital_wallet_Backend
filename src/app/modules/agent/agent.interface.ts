import { Types } from 'mongoose';

export interface IAgent {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  isSuspended: boolean;
  isApproved: boolean; // Optional field for admin approval
  commissionEarned: number;
  createdAt?: Date;
  updatedAt?: Date;
}