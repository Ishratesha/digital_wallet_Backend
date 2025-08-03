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
exports.WalletController = void 0;
//import { User } from '../user/user.interface';
//import catchAsync from '../../../shared/catchAsync';
const wallet_service_1 = require("./wallet.service");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utiles/catchAsync"));
exports.WalletController = {
    getWallet: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({ success: false, message: 'User not authenticated' });
        }
        const wallet = yield wallet_service_1.WalletService.getWalletByUser(req.user._id);
        res.status(http_status_1.default.OK).json({ success: true, data: wallet });
    })),
};
