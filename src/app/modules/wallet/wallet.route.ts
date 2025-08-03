import express from 'express';
import { WalletController } from './wallet.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../user/user.interface';
//import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/my-wallet', auth('USER'), WalletController.getWallet);

export default router;
