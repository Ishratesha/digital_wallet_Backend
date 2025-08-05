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
exports.TransactionController = void 0;
const transaction_service_1 = require("./transaction.service");
const AppError_1 = __importDefault(require("../../middlewares/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
exports.TransactionController = {
    addMoney: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("user in add money", req.user);
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user info found' });
        }
        const result = yield transaction_service_1.TransactionService.addMoney(req.user._id, req.body.amount, req.body.password);
        res.status(200).json({ message: 'Money added', data: result });
    }),
    withdrawMoney: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user info found' });
        }
        const result = yield transaction_service_1.TransactionService.withdrawMoney(req.user._id, req.body.amount, req.body.password);
        res.status(200).json({ message: 'Money withdrawn', data: result });
    }),
    sendMoney: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("req.user", req.user);
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user info found' });
        }
        const { phoneNumber, amount, password } = req.body;
        const result = yield transaction_service_1.TransactionService.sendMoney(req.user._id, phoneNumber, amount, password);
        res.status(200).json({ message: 'Money sent', data: result });
    }),
    // myTransactions: async (req: Request, res: Response) => {
    //   if (!req.user) {
    //     return res.status(401).json({ message: 'Unauthorized: No user info found' });
    //   }
    //   const result = await TransactionService.getTransactions(req.user._id);
    //   res.status(200).json({ message: 'Transaction history', data: result });
    // },
    myTransactions: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Check if user is authenticated and _id is available
            if (!req.user || !req.user._id) {
                // Use your AppError for consistency and proper error handling
                throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Unauthorized: User information not found after authentication.');
            }
            // Pass the userId (as string) to the service
            const result = yield transaction_service_1.TransactionService.getTransactions(req.user._id.toString());
            res.status(http_status_codes_1.default.OK).json({
                success: true, // It's good practice to include a success flag
                message: 'Transaction history fetched successfully!',
                data: result,
            });
        }
        catch (error) {
            // Catch any errors (e.g., from service or AppError) and pass to global error handler
            next(error);
        }
    }),
    userTransactionHistory: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user || !req.user._id) {
                throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Unauthorized: User information not found after authentication.');
            }
            const { userId } = req.params; // Assuming userId is passed as a route parameter
            const result = yield transaction_service_1.TransactionService.getUserTransactionHistory(userId);
            res.status(http_status_codes_1.default.OK).json({
                success: true,
                message: 'User transaction history fetched successfully!',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    cashIn: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(401).json({ message: 'Unauthorized' });
        const { phoneNumber, amount, password } = req.body;
        const result = yield transaction_service_1.TransactionService.cashInByAgent(req.user._id, phoneNumber, amount, password);
        res.status(200).json(result);
    }),
    cashOut: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(401).json({ message: 'Unauthorized' });
        const { receiverPhone, amount, password } = req.body;
        const result = yield transaction_service_1.TransactionService.cashOut(req.user._id, receiverPhone, amount, password);
        res.status(200).json(result);
    }),
    agentTransactions: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user || !req.user._id) {
                throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Unauthorized: User information not found after authentication.');
            }
            const result = yield transaction_service_1.TransactionService.getAgentTransactions(req.user._id.toString());
            res.status(http_status_codes_1.default.OK).json({
                success: true,
                message: 'Agent transaction history fetched successfully!',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    })
};
