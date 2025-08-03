"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const wallet_model_1 = require("../wallet/wallet.model");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../middlewares/AppError"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, email, password } = payload, rest = __rest(payload, ["phoneNumber", "email", "password"]);
    const isUserExist = yield user_model_1.User.findOne({ email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Already Exist");
    }
    //const hashedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))
    if (!payload.password) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password is required");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
    const authProvider = { provider: "credentials", providerId: email };
    const user = yield user_model_1.User.create(Object.assign({ phoneNumber,
        email, password: hashedPassword, auths: [authProvider] }, rest));
    yield wallet_model_1.Wallet.create({
        userId: user._id, // ✅ Required and now available
        balance: 50, // ✅ You can omit this because it defaults to 0
    });
    return user;
});
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
const getUserByPhoneNumber = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne({ phoneNumber });
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findById(id);
});
exports.UserService = {
    createUser,
    getUserByPhoneNumber,
    getUserById,
};
