"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookie = exports.setAuthCookie = exports.signAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const TOKEN_EXPIRY = '7d';
const baseCookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: env_1.env.nodeEnv === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
};
const signAuthToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, env_1.env.jwtSecret, { expiresIn: TOKEN_EXPIRY });
};
exports.signAuthToken = signAuthToken;
const setAuthCookie = (res, token) => {
    res.cookie(env_1.env.sessionCookieName, token, baseCookieOptions);
};
exports.setAuthCookie = setAuthCookie;
const clearAuthCookie = (res) => {
    res.clearCookie(env_1.env.sessionCookieName, { path: '/' });
};
exports.clearAuthCookie = clearAuthCookie;
