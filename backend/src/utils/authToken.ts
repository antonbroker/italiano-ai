import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

const TOKEN_EXPIRY = '7d';

// Cookie options for production (cross-origin) and development (same-origin)
const getCookieOptions = () => {
  const isProduction = env.nodeEnv === 'production';
  
  const options = {
    httpOnly: true as const,
    sameSite: (isProduction ? 'none' : 'lax') as 'none' | 'lax',
    secure: isProduction,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
    // Do NOT set domain - allows cookies to work cross-origin
  };

  if (isProduction) {
    console.log('[Cookie] Production mode - using SameSite=None, Secure=true');
  } else {
    console.log('[Cookie] Development mode - using SameSite=Lax, Secure=false');
  }

  return options;
};

export const signAuthToken = (userId: string) => {
  return jwt.sign({ userId }, env.jwtSecret, { expiresIn: TOKEN_EXPIRY });
};

export const setAuthCookie = (res: Response, token: string) => {
  const options = getCookieOptions();
  res.cookie(env.sessionCookieName, token, options);
  console.log(`[Cookie] Set cookie: ${env.sessionCookieName} (SameSite=${options.sameSite}, Secure=${options.secure})`);
};

export const clearAuthCookie = (res: Response) => {
  const options = getCookieOptions();
  res.clearCookie(env.sessionCookieName, {
    ...options,
    // Must include all options when clearing
  });
  console.log(`[Cookie] Cleared cookie: ${env.sessionCookieName}`);
};

