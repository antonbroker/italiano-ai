"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProgressUpdateSchema = exports.userProgressCreateSchema = exports.userProgressQuerySchema = void 0;
const zod_1 = require("zod");
exports.userProgressQuerySchema = zod_1.z.object({
    userEmail: zod_1.z.string().email(),
    lessonId: zod_1.z.string().uuid().optional(),
});
exports.userProgressCreateSchema = zod_1.z.object({
    userEmail: zod_1.z.string().email(),
    lessonId: zod_1.z.string().uuid(),
    completed: zod_1.z.boolean().default(false),
    progressPercentage: zod_1.z.number().min(0).max(100).default(0),
});
exports.userProgressUpdateSchema = zod_1.z.object({
    completed: zod_1.z.boolean().optional(),
    progressPercentage: zod_1.z.number().min(0).max(100).optional(),
});
