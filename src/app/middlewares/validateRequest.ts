// src/shared/validateRequest.ts
import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors,
    });
  }
};
