import express from 'express';
import { TransactionController } from './transaction.controller';

import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post('/add-money',auth('USER'), TransactionController.addMoney);
router.post('/withdraw' , TransactionController.withdrawMoney);
router.post('/send-money', auth('USER'), TransactionController.sendMoney);
router.post('/cash-in', auth('AGENT'), TransactionController.cashIn);
router.post('/cash-out', auth('USER'), TransactionController.cashOut);

router.get('/history', auth('USER'), TransactionController.myTransactions);

export default router;
