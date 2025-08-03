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
exports.TransactionController = void 0;
const transaction_service_1 = require("./transaction.service");
exports.TransactionController = {
    addMoney: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("user in add money", req.user);
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user info found' });
        }
        const result = yield transaction_service_1.TransactionService.addMoney(req.user._id, req.body.amount);
        res.status(200).json({ message: 'Money added', data: result });
    }),
    withdrawMoney: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user info found' });
        }
        const result = yield transaction_service_1.TransactionService.withdrawMoney(req.user._id, req.body.amount);
        res.status(200).json({ message: 'Money withdrawn', data: result });
    }),
    sendMoney: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("req.user", req.user);
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user info found' });
        }
        const { phoneNumber, amount } = req.body;
        const result = yield transaction_service_1.TransactionService.sendMoney(req.user._id, phoneNumber, amount);
        res.status(200).json({ message: 'Money sent', data: result });
    }),
    myTransactions: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user info found' });
        }
        const result = yield transaction_service_1.TransactionService.getTransactions(req.user._id);
        res.status(200).json({ message: 'Transaction history', data: result });
    }),
    cashIn: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(401).json({ message: 'Unauthorized' });
        const { phoneNumber, amount } = req.body;
        const result = yield transaction_service_1.TransactionService.cashInByAgent(req.user._id, phoneNumber, amount);
        res.status(200).json(result);
    }),
    cashOut: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(401).json({ message: 'Unauthorized' });
        const { receiverPhone, amount } = req.body;
        const result = yield transaction_service_1.TransactionService.cashOut(req.user._id, receiverPhone, amount);
        res.status(200).json(result);
    }),
};
