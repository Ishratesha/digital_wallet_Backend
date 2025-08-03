import { User } from './user.model';
import { IAuthProvider, IUser } from './user.interface';
import bcrypt from 'bcrypt';
import { Wallet } from '../wallet/wallet.model';
import httpStatus from 'http-status';
import AppError from '../../middlewares/AppError';
const createUser = async (payload: Partial<IUser>) => {
  const { phoneNumber,email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email })

  if (isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
  }

  //const hashedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))
  if (!payload.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is required");
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }


  const user = await User.create({
    phoneNumber, 
    email,
      password: hashedPassword,
      auths: [authProvider],
      ...rest
  })
  await Wallet.create({
    userId: user._id, // ✅ Required and now available
    balance: 50,       // ✅ You can omit this because it defaults to 0
  });
  return user

}
// const createUser = async (payload: IUser): Promise<IUser> => {
//   // hash password before saving
//   const hashedPassword = await bcrypt.hash(payload.password, 10);
//   const newUser = await User.create({ ...payload, password: hashedPassword });

//   //  Create wallet for the user after registration
//   await Wallet.create({
//     user: newUser._id,
//     balance: 50,
//   });

//   return newUser;
// };

const getUserByPhoneNumber = async (phoneNumber: string): Promise<IUser | null> => {
  return await User.findOne({ phoneNumber });
};

const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

export const UserService = {
  createUser,
  getUserByPhoneNumber,
  getUserById,
};

