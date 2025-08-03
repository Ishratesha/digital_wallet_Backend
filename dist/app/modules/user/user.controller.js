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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
//import catchAsync from '../../../shared/catchAsync';
const user_service_1 = require("./user.service");
const catchAsync_1 = __importDefault(require("../../utiles/catchAsync"));
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body;
    // prevent public registration for ADMIN or SUPER_ADMIN
    if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
        return res.status(http_status_1.default.FORBIDDEN).json({
            success: false,
            message: 'You are not allowed to register as ADMIN or SUPER_ADMIN',
        });
    }
    const user = yield user_service_1.UserService.createUser(req.body);
    res.status(http_status_1.default.CREATED).json({
        success: true,
        message: 'User registered successfully',
        data: user,
    });
}));
exports.UserController = {
    registerUser,
};
