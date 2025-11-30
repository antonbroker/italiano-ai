"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonIdSchema = exports.lessonPayloadSchema = void 0;
const zod_1 = require("zod");
exports.lessonPayloadSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().optional().nullable(),
    level: zod_1.z.enum(['beginner', 'intermediate', 'advanced']),
    topics: zod_1.z.array(zod_1.z.string()).default([]),
    duration: zod_1.z.string().optional().nullable(),
    content: zod_1.z.string().optional().nullable(),
});
exports.lessonIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
