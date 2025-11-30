"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatMessageQuerySchema = exports.chatMessageCreateSchema = void 0;
const zod_1 = require("zod");
exports.chatMessageCreateSchema = zod_1.z.object({
    userEmail: zod_1.z.string().email(),
    message: zod_1.z.string().min(1),
    role: zod_1.z.enum(['user', 'tutor']).default('user'),
    lessonId: zod_1.z.string().uuid().optional().nullable(),
});
exports.chatMessageQuerySchema = zod_1.z.object({
    userEmail: zod_1.z.string().email(),
    limit: zod_1.z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((val) => !Number.isNaN(val) && val > 0 && val <= 200, {
        message: 'limit must be between 1 and 200',
    })
        .optional(),
});
