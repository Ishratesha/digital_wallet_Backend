import express from 'express';
import { AdminController } from './admin.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get('/users', auth('ADMIN'), AdminController.getAllUsers);
router.get('/transactions', auth('ADMIN'), AdminController.getAllTransactions);
router.get('/wallets', auth('ADMIN'), AdminController.getAllWallets);
router.patch('/wallets/:walletId/block', auth('ADMIN'), AdminController.blockWallet);
router.patch('/agents/:agentId/approve', auth('ADMIN'), AdminController.approveOrSuspendAgent);
router.patch('/agents/:agentId/suspend', auth('ADMIN'), AdminController.approveOrSuspendAgent);
export default router;