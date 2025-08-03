"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/modules/user/user.route");
const auth_route_1 = require("./app/modules/auth/auth.route");
const transaction_route_1 = __importDefault(require("./app/modules/transaction/transaction.route"));
const admin_route_1 = __importDefault(require("./app/modules/admin/admin.route"));
//import cors from 'cors';
//import morgan from 'morgan';
//import globalErrorHandler from './app/middlewares/globalErrorHandler';
//import notFoundHandler from './app/middlewares/notFoundHandler';
//import router from './app/routes';
const app = (0, express_1.default)();
// Middlewares
//app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//app.use(morgan('dev'));
// Application Routes
app.use('/api/users', user_route_1.UserRoutes);
app.use('/api/auth', auth_route_1.AuthRoutes); // Assuming you have AuthRoutes defined
app.use('/api/transactions', transaction_route_1.default);
app.use('/api/admin', admin_route_1.default);
// Health check
app.get('/', (req, res) => {
    res.send('🌐 Digital Wallet System API is running...');
});
// Global Error Handler
//app.use(globalErrorHandler);
// Handle 404
//app.use(notFoundHandler);
exports.default = app;
