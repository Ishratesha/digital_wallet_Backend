import { Schema, model } from 'mongoose';
import { IAuthProvider, IUser, UserRole, UserStatus } from './user.interface';

const authProviderSchema = new Schema<IAuthProvider>({
  provider: { type: String, required: true },
  providerId: { type: String, required: true }
}, {
  versionKey: false,
  _id: false
})

const userSchema = new Schema<IUser>(
  {
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^01[3-9]\d{8}$/, // ✅ fixed here
      },
    nid: {
      type: String,
      required: true,
      match: /^\d{10}$/,
      unique: true,
    },
    picture:{type:String},
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER
  },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    auths: [authProviderSchema],
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>('User', userSchema);
