"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const user_service_1 = require("../services/user.service");
const auth_schema_1 = require("../validation/auth.schema");
const httpError_1 = require("../utils/httpError");
const authToken_1 = require("../utils/authToken");
exports.authController = {
    async me(req, res) {
        if (!req.user) {
            throw new httpError_1.HttpError(401, 'Unauthorized');
        }
        return res.json(req.user);
    },
    async register(req, res) {
        const payload = auth_schema_1.registerSchema.parse(req.body);
        const exists = await user_service_1.userService.emailExists(payload.email);
        if (exists) {
            throw new httpError_1.HttpError(409, 'Email already registered');
        }
        const user = await user_service_1.userService.createWithPassword({
            email: payload.email,
            password: payload.password,
            fullName: payload.fullName,
        });
        const token = (0, authToken_1.signAuthToken)(user.id);
        (0, authToken_1.setAuthCookie)(res, token);
        res.status(201).json(user);
    },
    async login(req, res) {
        const payload = auth_schema_1.loginSchema.parse(req.body);
        const user = await user_service_1.userService.verifyCredentials(payload.email, payload.password);
        if (!user) {
            throw new httpError_1.HttpError(401, 'Invalid email or password');
        }
        const token = (0, authToken_1.signAuthToken)(user.id);
        (0, authToken_1.setAuthCookie)(res, token);
        res.json(user);
    },
    async logout(_req, res) {
        (0, authToken_1.clearAuthCookie)(res);
        res.status(204).send();
    },
};
