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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const wallet_model_1 = require("./wallet.model");
exports.WalletService = {
    createWallet: (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
        return wallet_model_1.Wallet.create({ userId, role });
    }),
    getWalletByUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return wallet_model_1.Wallet.findOne({ userId });
    }),
    updateBalance: (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
        return wallet_model_1.Wallet.findOneAndUpdate({ userId }, { $inc: { balance: amount } }, { new: true });
    }),
    setBlocked: (userId, isBlocked) => __awaiter(void 0, void 0, void 0, function* () {
        return wallet_model_1.Wallet.findOneAndUpdate({ userId }, { isBlocked }, { new: true });
    }),
};
