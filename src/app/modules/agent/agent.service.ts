import { Agent } from './agent.model';
import { IAgent } from './agent.interface';
import { Types } from 'mongoose';

const createAgent = async (userId: Types.ObjectId): Promise<IAgent> => {
  const agent = await Agent.create({ user: userId });
  return agent;
};

const getAgentByUserId = async (userId: Types.ObjectId): Promise<IAgent | null> => {
  return Agent.findOne({ user: userId });
};

const updateCommission = async (userId: Types.ObjectId, amount: number): Promise<void> => {
  await Agent.updateOne({ user: userId }, { $inc: { commissionEarned: amount } });
};

const suspendAgent = async (agentId: Types.ObjectId): Promise<void> => {
  await Agent.findByIdAndUpdate(agentId, { isSuspended: true });
};

const approveAgent = async (agentId: Types.ObjectId): Promise<void> => {
  await Agent.findByIdAndUpdate(agentId, { isSuspended: false });
};

export const AgentService = {
  createAgent,
  getAgentByUserId,
  updateCommission,
  suspendAgent,
  approveAgent,
};
