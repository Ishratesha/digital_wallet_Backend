import express from 'express';
import { TransactionController } from './transaction.controller';

import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post('/add-money',auth('USER'), TransactionController.addMoney);
router.post('/withdraw',auth('AGENT'), TransactionController.withdrawMoney);
router.post('/send-money', auth('USER'), TransactionController.sendMoney);
router.post('/cash-in', auth('AGENT'), TransactionController.cashIn);
router.post('/cash-out', auth('USER'), TransactionController.cashOut);

router.get('/history', auth('USER'), TransactionController.myTransactions);
router.get('/history/user', auth('USER'), TransactionController.userTransactionHistory);
router.get ('/agent-transactions',auth('AGENT'), TransactionController.agentTransactions)

export default router;
