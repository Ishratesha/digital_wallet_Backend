import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { envVars } from '../config/env'; // Adjust path based on your structure
import { UserRole, UserStatus } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import { Wallet } from '../modules/wallet/wallet.model';

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(envVars.DB_URL as string);

    const existingAdmin = await User.findOne({ role: UserRole.ADMIN });

    if (existingAdmin) {
      console.log('Super admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD, 10); // Change as needed

    const admin = await User.create({
      phoneNumber: '01703507716',
      nid: '1211560890',
      email: 'admin@wallet.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      picture: 'https://via.placeholder.com/150',
    });

    await Wallet.create({
      userId: admin._id,
      balance: 50,
    });

    console.log('✅ Super admin seeded successfully');
  } catch (error) {
    console.error('❌ Failed to seed super admin:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedSuperAdmin();
