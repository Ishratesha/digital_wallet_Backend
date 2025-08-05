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
exports.AdminController = void 0;
const admin_service_1 = require("./admin.service");
exports.AdminController = {
    getAllUsers: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield admin_service_1.AdminService.getAllUsers();
        res.status(200).json({ success: true, data: users });
    }),
    getAllTransactions: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const transactions = yield admin_service_1.AdminService.getAllTransactions();
        res.status(200).json({ success: true, data: transactions });
    }),
    getAllWallets: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const wallets = yield admin_service_1.AdminService.getAllWallets();
        res.status(200).json({ success: true, data: wallets });
    }),
    approveOrSuspendAgent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { agentId } = req.params;
        const { isSuspended } = req.body; // true or false
        const agent = yield admin_service_1.AdminService.updateAgentStatus(agentId, isSuspended);
        if (!agent)
            return res.status(404).json({ message: 'Agent not found' });
        res.status(200).json({ message: `Agent ${isSuspended ? 'suspended' : 'approved'} successfully`, data: agent });
    }),
    blockWallet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { walletId } = req.params;
        const { isBlocked } = req.body; // true or false
        const wallet = yield admin_service_1.AdminService.blockWallet(walletId, isBlocked);
        if (!wallet)
            return res.status(404).json({ message: 'Wallet not found' });
        res.status(200).json({ message: `Wallet ${isBlocked ? 'blocked' : 'unblocked'} successfully`, data: wallet });
    }),
};
