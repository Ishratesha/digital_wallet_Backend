"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const authProviderSchema = new mongoose_1.Schema({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
}, {
    versionKey: false,
    _id: false
});
const userSchema = new mongoose_1.Schema({
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
    picture: { type: String },
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
        enum: Object.values(user_interface_1.UserRole),
        default: user_interface_1.UserRole.USER
    },
    status: {
        type: String,
        enum: Object.values(user_interface_1.UserStatus),
        default: user_interface_1.UserStatus.ACTIVE,
    },
    auths: [authProviderSchema],
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
