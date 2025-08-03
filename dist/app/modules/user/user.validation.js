"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
exports.userValidationSchema = zod_1.z.object({
    phoneNumber: zod_1.z
        .string()
        .regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),
    nid: zod_1.z
        .string()
        .regex(/^\d{10}$/, 'NID must be exactly 10 digits'),
    picture: zod_1.z.string().optional(),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z
        .string()
        .regex(/^\d{5}$/, 'Password must be numeric and exactly 5 digits'),
    role: zod_1.z
        // .enum(["ADMIN", "GUIDE", "USER", "SUPER_ADMIN"])
        .enum(Object.values(user_interface_1.UserRole))
        .optional(),
    status: zod_1.z.enum(user_interface_1.UserStatus).optional(),
    // auths: z
    //   .array(
    //     z.object({
    //       provider: z.string(),
    //       providerId: z.string(),
    //     })
    //   )
});
