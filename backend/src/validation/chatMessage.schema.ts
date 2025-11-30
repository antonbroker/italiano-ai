import { z } from 'zod';

export const chatMessageCreateSchema = z.object({
  userEmail: z.string().email(),
  message: z.string().min(1),
  role: z.enum(['user', 'tutor']).default('user'),
  lessonId: z.string().uuid().optional().nullable(),
});

export const chatMessageQuerySchema = z.object({
  userEmail: z.string().email(),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !Number.isNaN(val) && val > 0 && val <= 200, {
      message: 'limit must be between 1 and 200',
    })
    .optional(),
});

