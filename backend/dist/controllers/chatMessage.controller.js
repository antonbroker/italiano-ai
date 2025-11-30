"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatMessageController = void 0;
const chatMessage_service_1 = require("../services/chatMessage.service");
const chatMessage_schema_1 = require("../validation/chatMessage.schema");
exports.chatMessageController = {
    async list(req, res) {
        const params = chatMessage_schema_1.chatMessageQuerySchema.parse({
            userEmail: req.query.userEmail ?? req.query.user_email,
            limit: req.query.limit,
        });
        const messages = await chatMessage_service_1.chatMessageService.listByUser(params.userEmail, params.limit ?? 100);
        res.json(messages);
    },
    async create(req, res) {
        const payload = chatMessage_schema_1.chatMessageCreateSchema.parse({
            userEmail: req.body.userEmail ?? req.body.user_email,
            message: req.body.message,
            role: req.body.role,
            lessonId: req.body.lessonId ?? req.body.lesson_id,
        });
        const created = await chatMessage_service_1.chatMessageService.create(payload);
        res.status(201).json(created);
    },
};
