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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const AppError_1 = __importDefault(require("./AppError"));
const env_1 = require("../config/env"); // import envVars
const auth = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new AppError_1.default(401, 'Unauthorized: Token missing');
            }
            const token = authHeader.split(' ')[1];
            // Use the correct secret
            const decoded = jsonwebtoken_1.default.verify(token, env_1.envVars.JWT_ACCESS_SECRET);
            console.log('Decoded token:', decoded);
            if (decoded.role !== role) {
                throw new AppError_1.default(403, 'Forbidden: Invalid role');
            }
            // Use userId from token, not _id
            const user = yield user_model_1.User.findById(decoded.userId);
            console.log('Decoded user:', user);
            if (!user) {
                throw new AppError_1.default(401, 'Unauthorized: User not found');
            }
            req.user = user;
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.auth = auth;
