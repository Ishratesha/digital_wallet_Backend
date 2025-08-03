"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.get('/users', (0, auth_1.auth)('ADMIN'), admin_controller_1.AdminController.getAllUsers);
router.get('/transactions', (0, auth_1.auth)('ADMIN'), admin_controller_1.AdminController.getAllTransactions);
router.get('/wallets', (0, auth_1.auth)('ADMIN'), admin_controller_1.AdminController.getAllWallets);
router.patch('/wallets/:walletId/block', (0, auth_1.auth)('ADMIN'), admin_controller_1.AdminController.blockWallet);
exports.default = router;
