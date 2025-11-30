import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = ['DATABASE_URL', 'CORS_ORIGIN', 'JWT_SECRET'] as const;

requiredEnv.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name} is required. Please define it in your .env file.`);
  }
});

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? '5000'),
  databaseUrl: process.env.DATABASE_URL as string,
  corsOrigin: process.env.CORS_ORIGIN as string,
  jwtSecret: process.env.JWT_SECRET as string,
  sessionCookieName: process.env.SESSION_COOKIE_NAME ?? 'italiano_ai_session',
};

