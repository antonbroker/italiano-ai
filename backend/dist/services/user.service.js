"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models");
const mapUser = (model) => ({
    id: model.id,
    email: model.email,
    fullName: model.fullName,
    avatarUrl: model.avatarUrl,
    createdAt: model.createdAt.toISOString(),
});
exports.userService = {
    async getById(id) {
        const user = await models_1.UserModel.findByPk(id);
        return user ? mapUser(user) : null;
    },
    async emailExists(email) {
        const existing = await models_1.UserModel.findOne({ where: { email } });
        return Boolean(existing);
    },
    async createWithPassword(payload) {
        const passwordHash = await bcryptjs_1.default.hash(payload.password, 12);
        const user = await models_1.UserModel.create({
            email: payload.email,
            fullName: payload.fullName,
            avatarUrl: payload.avatarUrl ?? null,
            passwordHash,
        });
        return mapUser(user);
    },
    async verifyCredentials(email, password) {
        const user = await models_1.UserModel.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        const valid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!valid) {
            return null;
        }
        return mapUser(user);
    },
};
