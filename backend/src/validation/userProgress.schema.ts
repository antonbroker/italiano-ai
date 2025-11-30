import { z } from 'zod';

export const userProgressQuerySchema = z.object({
  userEmail: z.string().email(),
  lessonId: z.string().uuid().optional(),
});

export const userProgressCreateSchema = z.object({
  userEmail: z.string().email(),
  lessonId: z.string().uuid(),
  completed: z.boolean().default(false),
  progressPercentage: z.number().min(0).max(100).default(0),
});

export const userProgressUpdateSchema = z.object({
  completed: z.boolean().optional(),
  progressPercentage: z.number().min(0).max(100).optional(),
});

