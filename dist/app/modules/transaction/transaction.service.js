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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const transaction_model_1 = require("./transaction.model");
const wallet_model_1 = require("../wallet/wallet.model");
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../middlewares/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
exports.TransactionService = {
    addMoney: (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("user id in add money service", userId);
        const wallet = yield wallet_model_1.Wallet.findOne({ userId: userId });
        if (!wallet || wallet.isBlocked)
            throw new Error('Wallet not available');
        wallet.balance += amount;
        yield wallet.save();
        yield transaction_model_1.Transaction.create({
            type: 'add-money',
            amount,
            receiver: userId,
        });
        return { balance: wallet.balance };
    }),
    withdrawMoney: (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
        const wallet = yield wallet_model_1.Wallet.findOne({ userId: userId });
        if (!wallet || wallet.isBlocked)
            throw new Error('Wallet not available');
        if (wallet.balance < amount)
            throw new Error('Insufficient balance');
        wallet.balance -= amount;
        yield wallet.save();
        yield transaction_model_1.Transaction.create({
            type: 'withdraw',
            amount,
            sender: userId,
        });
        return { balance: wallet.balance };
    }),
    sendMoney: (senderId, receiverPhone, amount) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("senderId", senderId);
        console.log("receiverPhone", receiverPhone);
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const senderWallet = yield wallet_model_1.Wallet.findOne({ userId: senderId }).session(session);
            const receiverUser = yield mongoose_1.default.model('User').findOne({ phoneNumber: receiverPhone }).session(session);
            console.log("receiverUser", receiverUser);
            if (!senderWallet || senderWallet.isBlocked)
                throw new Error('Sender wallet not available');
            if (!receiverUser)
                throw new Error('Receiver user not found');
            const receiverWallet = yield wallet_model_1.Wallet.findOne({ userId: receiverUser._id }).session(session);
            if (!receiverWallet || receiverWallet.isBlocked)
                throw new Error('Receiver wallet not available');
            if (senderWallet.balance < amount)
                throw new Error('Insufficient balance');
            senderWallet.balance -= amount;
            receiverWallet.balance += amount;
            yield senderWallet.save({ session });
            yield receiverWallet.save({ session });
            yield transaction_model_1.Transaction.create([{
                    type: 'send-money',
                    amount,
                    sender: senderId,
                    receiver: receiverUser._id,
                }], { session });
            yield session.commitTransaction();
            session.endSession();
            return { senderBalance: senderWallet.balance };
        }
        catch (error) {
            yield session.abortTransaction();
            session.endSession();
            throw error;
        }
    }),
    getTransactions: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield transaction_model_1.Transaction.find({
            $or: [{ sender: userId }, { receiver: userId }],
        }).sort({ createdAt: -1 });
    }),
    cashInByAgent: (agentId, targetPhoneNumber, amount) => __awaiter(void 0, void 0, void 0, function* () {
        const targetUser = yield user_model_1.User.findOne({ phoneNumber: targetPhoneNumber });
        if (!targetUser)
            throw new AppError_1.default(404, "Target user not found");
        const targetWallet = yield wallet_model_1.Wallet.findOne({ userId: targetUser._id });
        if (!targetWallet)
            throw new AppError_1.default(404, "Target wallet not found");
        // Optional: Save commission for agent
        const commissionRate = 0.01;
        const commissionAmount = amount * commissionRate;
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            targetWallet.balance += amount;
            yield targetWallet.save({ session });
            yield transaction_model_1.Transaction.create([{
                    type: 'cash-in',
                    amount,
                    from: agentId,
                    to: targetUser._id,
                    initiatedBy: 'agent'
                }], { session });
            // Optional: Record commission for agent
            // await Commission.create({ agent: agentId, amount: commissionAmount });
            yield session.commitTransaction();
            session.endSession();
            return { message: 'Cash-in successful', balance: targetWallet.balance };
        }
        catch (err) {
            yield session.abortTransaction();
            session.endSession();
            throw err;
        }
    }),
    cashOut: (senderId, receiverPhone, amount) => __awaiter(void 0, void 0, void 0, function* () {
        // Find agent by phone number
        const agentUser = yield user_model_1.User.findOne({ phoneNumber: receiverPhone });
        if (!agentUser) {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Agent not found');
        }
        if (agentUser.role !== 'AGENT') {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Receiver is not an agent');
        }
        // Find sender (user) wallet
        const senderWallet = yield wallet_model_1.Wallet.findOne({ userId: senderId });
        if (!senderWallet || senderWallet.balance < amount) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Insufficient balance in user wallet');
        }
        // Find agent wallet
        const agentWallet = yield wallet_model_1.Wallet.findOne({ userId: agentUser._id });
        if (!agentWallet) {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Agent wallet not found');
        }
        // Transaction
        senderWallet.balance -= amount;
        agentWallet.balance += amount;
        yield senderWallet.save();
        yield agentWallet.save();
        // Record transaction
        yield transaction_model_1.Transaction.create({
            sender: senderId,
            receiver: agentUser._id,
            amount,
            type: 'cash-out',
        });
        return {
            message: 'Cash-out successful',
            remainingBalance: senderWallet.balance,
        };
    }),
};
