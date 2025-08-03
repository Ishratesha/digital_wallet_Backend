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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentService = void 0;
const agent_model_1 = require("./agent.model");
const createAgent = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = yield agent_model_1.Agent.create({ user: userId });
    return agent;
});
const getAgentByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return agent_model_1.Agent.findOne({ user: userId });
});
const updateCommission = (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    yield agent_model_1.Agent.updateOne({ user: userId }, { $inc: { commissionEarned: amount } });
});
const suspendAgent = (agentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield agent_model_1.Agent.findByIdAndUpdate(agentId, { isSuspended: true });
});
const approveAgent = (agentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield agent_model_1.Agent.findByIdAndUpdate(agentId, { isSuspended: false });
});
exports.AgentService = {
    createAgent,
    getAgentByUserId,
    updateCommission,
    suspendAgent,
    approveAgent,
};
