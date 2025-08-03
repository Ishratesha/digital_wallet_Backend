"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation"); // wherever you put your schema
const validateRequest_1 = require("../../middlewares/validateRequest");
//import { validateRequest } from '../../../shared/validateRequest';
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.validateRequest)(user_validation_1.userValidationSchema), // Validate request body
user_controller_1.UserController.registerUser);
exports.UserRoutes = router;
