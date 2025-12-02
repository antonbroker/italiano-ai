import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { env } from './config/env';
import routes from './routes';
import { notFoundHandler } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';
import { authenticate } from './middleware/authenticate';

const app = express();

// Parse allowed origins from environment
const allowedOrigins = env.corsOrigin.split(',').map((origin) => origin.trim());

console.log('[CORS] Allowed origins:', allowedOrigins);
console.log('[CORS] Node environment:', env.nodeEnv);

// CORS configuration with explicit preflight handling
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) {
        return callback(null, true);
      }

      // Check if origin is in allowed list
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn('[CORS] Blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400, // 24 hours
  }),
);

// Configure Helmet to work with cross-origin cookies
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(authenticate);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

