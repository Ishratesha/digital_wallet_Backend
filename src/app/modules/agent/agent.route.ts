import express from 'express';
import { AgentController } from './agent.controller';
import { auth } from '../../middlewares/auth';
//import { USER_ROLE } from '../../../constants/role';

const router = express.Router();

router.get('/me', auth('AGENT'), AgentController.getAgent);

export const AgentRoutes = router;
