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
exports.AdminService = void 0;
const user_model_1 = require("../user/user.model");
const transaction_model_1 = require("../transaction/transaction.model");
const wallet_model_1 = require("../wallet/wallet.model");
exports.AdminService = {
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        return user_model_1.User.find().sort({ createdAt: -1 });
    }),
    getAllTransactions: () => __awaiter(void 0, void 0, void 0, function* () {
        return transaction_model_1.Transaction.find().sort({ createdAt: -1 });
    }),
    getAllWallets: () => __awaiter(void 0, void 0, void 0, function* () {
        return wallet_model_1.Wallet.find().sort({ createdAt: -1 });
    }),
    updateAgentStatus: (agentId, isApproved) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_model_1.User.findByIdAndUpdate(agentId, { isApproved }, { new: true });
    }),
    blockWallet: (walletId, isBlocked) => __awaiter(void 0, void 0, void 0, function* () {
        return yield wallet_model_1.Wallet.findByIdAndUpdate(walletId, { isBlocked }, { new: true });
    }),
};
