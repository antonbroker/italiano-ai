"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonController = void 0;
const lesson_service_1 = require("../services/lesson.service");
const lesson_schema_1 = require("../validation/lesson.schema");
const httpError_1 = require("../utils/httpError");
exports.lessonController = {
    async list(_req, res) {
        const lessons = await lesson_service_1.lessonService.list();
        res.json(lessons);
    },
    async getById(req, res) {
        const { id } = req.params;
        if (!id) {
            throw new httpError_1.HttpError(400, 'Lesson id is required');
        }
        const lesson = await lesson_service_1.lessonService.findById(id);
        res.json(lesson);
    },
    async create(req, res) {
        const payload = lesson_schema_1.lessonPayloadSchema.parse(req.body);
        const lesson = await lesson_service_1.lessonService.create(payload);
        res.status(201).json(lesson);
    },
    async update(req, res) {
        const { id } = req.params;
        const payload = lesson_schema_1.lessonPayloadSchema.partial().parse(req.body);
        const lesson = await lesson_service_1.lessonService.update(id, payload);
        res.json(lesson);
    },
    async remove(req, res) {
        const { id } = req.params;
        await lesson_service_1.lessonService.remove(id);
        res.status(204).send();
    },
};
