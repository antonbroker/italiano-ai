"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatMessageService = void 0;
const models_1 = require("../models");
exports.chatMessageService = {
    async listByUser(userEmail, limit = 100) {
        const messages = await models_1.ChatMessageModel.findAll({
            where: { userEmail },
            order: [['createdAt', 'ASC']],
            limit,
        });
        return messages.map((msg) => ({
            id: msg.id,
            userEmail: msg.userEmail,
            message: msg.message,
            role: msg.role,
            lessonId: msg.lessonId,
            createdAt: msg.createdAt.toISOString(),
            updatedAt: msg.updatedAt.toISOString(),
        }));
    },
    async create(payload) {
        const message = await models_1.ChatMessageModel.create({
            userEmail: payload.userEmail,
            message: payload.message,
            role: payload.role,
            lessonId: payload.lessonId ?? null,
        });
        return {
            id: message.id,
            userEmail: message.userEmail,
            message: message.message,
            role: message.role,
            lessonId: message.lessonId,
            createdAt: message.createdAt.toISOString(),
            updatedAt: message.updatedAt.toISOString(),
        };
    },
};
