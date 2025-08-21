import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
import { AuthRoutes } from './app/modules/auth/auth.route';
import transactionRoutes from './app/modules/transaction/transaction.route';
import adminRoutes from './app/modules/admin/admin.route';

import cors from 'cors';
//import morgan from 'morgan';
//import globalErrorHandler from './app/middlewares/globalErrorHandler';
//import notFoundHandler from './app/middlewares/notFoundHandler';
//import router from './app/routes';

const app: Application = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(morgan('dev'));

// Application Routes
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes); // Assuming you have AuthRoutes defined
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send('🌐 Digital Wallet System API is running...');
});

// Global Error Handler
//app.use(globalErrorHandler);

// Handle 404
//app.use(notFoundHandler);

export default app;
