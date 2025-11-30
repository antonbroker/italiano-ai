import { z } from 'zod';

export const lessonPayloadSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  topics: z.array(z.string()).default([]),
  duration: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
});

export const lessonIdSchema = z.object({
  id: z.string().uuid(),
});

