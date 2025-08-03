import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { AgentService } from './agent.service';
import catchAsync from '../../utiles/catchAsync';
import { sendResponse } from '../../utiles/sendResponse';

const getAgent = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new Error('User ID is required');
  }
  const agent = await AgentService.getAgentByUserId(new mongoose.Types.ObjectId(userId));
  //const agent = await AgentService.getAgentByUserId(userId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Agent retrieved successfully',
    data: agent,
  });
});

export const AgentController = {
  getAgent,
};