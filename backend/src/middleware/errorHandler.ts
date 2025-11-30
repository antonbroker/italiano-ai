import type { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/httpError';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error('[error]', err);
  return res.status(500).json({ message: 'Internal server error' });
};

