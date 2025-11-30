"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const user_service_1 = require("../services/user.service");
const extractToken = (req) => {
    const cookieName = env_1.env.sessionCookieName;
    if (req.cookies && req.cookies[cookieName]) {
        return req.cookies[cookieName];
    }
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return null;
};
const authenticate = async (req, _res, next) => {
    const token = extractToken(req);
    if (!token) {
        return next();
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        const user = await user_service_1.userService.getById(payload.userId);
        if (user) {
            req.user = user;
        }
    }
    catch (error) {
        console.warn('[auth] Invalid session token', error);
    }
    return next();
};
exports.authenticate = authenticate;
const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return next();
};
exports.requireAuth = requireAuth;
