"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wallet_controller_1 = require("./wallet.controller");
const auth_1 = require("../../middlewares/auth");
//import auth from '../../middlewares/auth';
const router = express_1.default.Router();
router.get('/my-wallet', (0, auth_1.auth)('USER'), wallet_controller_1.WalletController.getWallet);
exports.default = router;
