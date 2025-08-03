import { z } from 'zod';
import { UserRole, UserStatus } from './user.interface';

export const userValidationSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),

  nid: z
    .string()
    .regex(/^\d{10}$/, 'NID must be exactly 10 digits'),

  picture: z.string().optional(),

  email: z.string().email('Invalid email address'),

  password: z
    .string()
    .regex(/^\d{5}$/, 'Password must be numeric and exactly 5 digits'),

    role: z
    // .enum(["ADMIN", "GUIDE", "USER", "SUPER_ADMIN"])
    .enum(Object.values(UserRole) as [string])
    .optional(),

  status: z.enum(UserStatus).optional(),

  // auths: z
  //   .array(
  //     z.object({
  //       provider: z.string(),
  //       providerId: z.string(),
  //     })
  //   )
  
});
