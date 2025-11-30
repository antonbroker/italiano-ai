import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

const TOKEN_EXPIRY = '7d';

const baseCookieOptions = {
  httpOnly: true as const,
  sameSite: (env.nodeEnv === 'production' ? 'none' : 'lax') as 'none' | 'lax',
  secure: env.nodeEnv === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

export const signAuthToken = (userId: string) => {
  return jwt.sign({ userId }, env.jwtSecret, { expiresIn: TOKEN_EXPIRY });
};

export const setAuthCookie = (res: Response, token: string) => {
  res.cookie(env.sessionCookieName, token, baseCookieOptions);
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie(env.sessionCookieName, {
    path: '/',
    httpOnly: true,
    sameSite: (env.nodeEnv === 'production' ? 'none' : 'lax') as 'none' | 'lax',
    secure: env.nodeEnv === 'production',
  });
};

