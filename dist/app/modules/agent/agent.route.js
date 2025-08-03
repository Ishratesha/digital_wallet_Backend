"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const agent_controller_1 = require("./agent.controller");
const auth_1 = require("../../middlewares/auth");
//import { USER_ROLE } from '../../../constants/role';
const router = express_1.default.Router();
router.get('/me', (0, auth_1.auth)('AGENT'), agent_controller_1.AgentController.getAgent);
exports.AgentRoutes = router;
