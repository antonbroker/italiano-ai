"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const requiredEnv = ['DATABASE_URL', 'CORS_ORIGIN', 'JWT_SECRET'];
requiredEnv.forEach((name) => {
    if (!process.env[name]) {
        throw new Error(`${name} is required. Please define it in your .env file.`);
    }
});
exports.env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? '5000'),
    databaseUrl: process.env.DATABASE_URL,
    corsOrigin: process.env.CORS_ORIGIN,
    jwtSecret: process.env.JWT_SECRET,
    sessionCookieName: process.env.SESSION_COOKIE_NAME ?? 'italiano_ai_session',
};
