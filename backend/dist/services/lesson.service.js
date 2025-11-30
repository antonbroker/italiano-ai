"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonService = void 0;
const zod_1 = require("zod");
const httpError_1 = require("../utils/httpError");
const models_1 = require("../models");
const lessonValidator = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().nullable(),
    level: zod_1.z.enum(['beginner', 'intermediate', 'advanced']),
    topics: zod_1.z.array(zod_1.z.string()),
    duration: zod_1.z.string().nullable(),
    content: zod_1.z.string().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
const toLesson = (lesson) => {
    const candidate = {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        level: lesson.level,
        topics: lesson.topics ?? [],
        duration: lesson.duration,
        content: lesson.content,
        createdAt: lesson.createdAt,
        updatedAt: lesson.updatedAt,
    };
    const parsed = lessonValidator.safeParse(candidate);
    if (!parsed.success) {
        console.warn(`[lessons] Skipping invalid lesson ${lesson.id}`, parsed.error.flatten().fieldErrors);
        return null;
    }
    return {
        ...parsed.data,
        createdAt: parsed.data.createdAt.toISOString(),
        updatedAt: parsed.data.updatedAt.toISOString(),
    };
};
const ensureLesson = (lesson) => {
    if (!lesson) {
        throw (0, httpError_1.notFoundError)('Lesson not found');
    }
    const parsed = toLesson(lesson);
    if (!parsed) {
        throw (0, httpError_1.notFoundError)('Lesson not found');
    }
    return parsed;
};
exports.lessonService = {
    async list() {
        const lessons = await models_1.LessonModel.findAll({ order: [['createdAt', 'ASC']] });
        return lessons.map(toLesson).filter((lesson) => Boolean(lesson));
    },
    async findById(id) {
        const lesson = await models_1.LessonModel.findByPk(id);
        return ensureLesson(lesson);
    },
    async create(payload) {
        const lesson = await models_1.LessonModel.create({
            title: payload.title,
            description: payload.description ?? null,
            level: payload.level,
            topics: payload.topics ?? [],
            duration: payload.duration ?? null,
            content: payload.content ?? null,
        });
        return ensureLesson(lesson);
    },
    async update(id, payload) {
        const lesson = await models_1.LessonModel.findByPk(id);
        if (!lesson) {
            throw (0, httpError_1.notFoundError)('Lesson not found');
        }
        await lesson.update({
            title: payload.title ?? lesson.title,
            description: payload.description ?? lesson.description,
            level: payload.level ?? lesson.level,
            topics: payload.topics ?? lesson.topics,
            duration: payload.duration ?? lesson.duration,
            content: payload.content ?? lesson.content,
        });
        return ensureLesson(lesson);
    },
    async remove(id) {
        await models_1.LessonModel.destroy({ where: { id } });
    },
};
