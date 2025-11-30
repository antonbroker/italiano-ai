import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { userService } from '../services/user.service';

interface TokenPayload {
  userId: string;
}

const extractToken = (req: Request): string | null => {
  const cookieName = env.sessionCookieName;
  if (req.cookies && req.cookies[cookieName]) {
    return req.cookies[cookieName];
  }
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return null;
};

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
  const token = extractToken(req);
  if (!token) {
    return next();
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as TokenPayload;
    const user = await userService.getById(payload.userId);
    if (user) {
      req.user = user;
    }
  } catch (error) {
    console.warn('[auth] Invalid session token', error);
  }

  return next();
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
};

