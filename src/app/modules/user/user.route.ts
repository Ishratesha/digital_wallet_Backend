import express from 'express';
import { UserController } from './user.controller';
import { userValidationSchema } from './user.validation'; // wherever you put your schema
import { validateRequest } from '../../middlewares/validateRequest';
//import { validateRequest } from '../../../shared/validateRequest';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidationSchema), // Validate request body
  UserController.registerUser
);


export const UserRoutes = router;
