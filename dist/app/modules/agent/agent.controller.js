"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const agent_service_1 = require("./agent.service");
const catchAsync_1 = __importDefault(require("../../utiles/catchAsync"));
const sendResponse_1 = require("../../utiles/sendResponse");
const getAgent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        throw new Error('User ID is required');
    }
    const agent = yield agent_service_1.AgentService.getAgentByUserId(new mongoose_1.default.Types.ObjectId(userId));
    //const agent = await AgentService.getAgentByUserId(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Agent retrieved successfully',
        data: agent,
    });
}));
exports.AgentController = {
    getAgent,
};
