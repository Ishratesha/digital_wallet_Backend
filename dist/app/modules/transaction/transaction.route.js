"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("./transaction.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.post('/add-money', (0, auth_1.auth)('USER'), transaction_controller_1.TransactionController.addMoney);
router.post('/withdraw', transaction_controller_1.TransactionController.withdrawMoney);
router.post('/send-money', (0, auth_1.auth)('USER'), transaction_controller_1.TransactionController.sendMoney);
router.post('/cash-in', (0, auth_1.auth)('AGENT'), transaction_controller_1.TransactionController.cashIn);
router.post('/cash-out', (0, auth_1.auth)('USER'), transaction_controller_1.TransactionController.cashOut);
router.get('/history', (0, auth_1.auth)('USER'), transaction_controller_1.TransactionController.myTransactions);
router.get('/history/user', (0, auth_1.auth)('USER'), transaction_controller_1.TransactionController.userTransactionHistory);
router.get('/agent-transactions', (0, auth_1.auth)('AGENT'), transaction_controller_1.TransactionController.agentTransactions);
exports.default = router;
