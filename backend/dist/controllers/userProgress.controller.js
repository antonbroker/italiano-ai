"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProgressController = void 0;
const userProgress_service_1 = require("../services/userProgress.service");
const userProgress_schema_1 = require("../validation/userProgress.schema");
exports.userProgressController = {
    async list(req, res) {
        const params = userProgress_schema_1.userProgressQuerySchema.parse({
            userEmail: req.query.userEmail ?? req.query.user_email,
            lessonId: req.query.lessonId ?? req.query.lesson_id,
        });
        const progress = await userProgress_service_1.userProgressService.list(params);
        res.json(progress);
    },
    async upsert(req, res) {
        const payload = userProgress_schema_1.userProgressCreateSchema.parse({
            userEmail: req.body.userEmail ?? req.body.user_email,
            lessonId: req.body.lessonId ?? req.body.lesson_id,
            completed: req.body.completed,
            progressPercentage: req.body.progressPercentage ?? req.body.progress_percentage,
        });
        const result = await userProgress_service_1.userProgressService.upsert(payload);
        res.status(201).json(result);
    },
    async update(req, res) {
        const { id } = req.params;
        const payload = userProgress_schema_1.userProgressUpdateSchema.parse({
            completed: req.body.completed,
            progressPercentage: req.body.progressPercentage ?? req.body.progress_percentage,
        });
        const updated = await userProgress_service_1.userProgressService.update(id, payload);
        res.json(updated);
    },
};
