import type { Request, Response } from 'express';
import { userProgressService } from '../services/userProgress.service';
import {
  userProgressCreateSchema,
  userProgressQuerySchema,
  userProgressUpdateSchema,
} from '../validation/userProgress.schema';

export const userProgressController = {
  async list(req: Request, res: Response) {
    const params = userProgressQuerySchema.parse({
      userEmail: req.query.userEmail ?? req.query.user_email,
      lessonId: req.query.lessonId ?? req.query.lesson_id,
    });

    const progress = await userProgressService.list(params);
    res.json(progress);
  },

  async upsert(req: Request, res: Response) {
    const payload = userProgressCreateSchema.parse({
      userEmail: req.body.userEmail ?? req.body.user_email,
      lessonId: req.body.lessonId ?? req.body.lesson_id,
      completed: req.body.completed,
      progressPercentage: req.body.progressPercentage ?? req.body.progress_percentage,
    });

    const result = await userProgressService.upsert(payload);
    res.status(201).json(result);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const payload = userProgressUpdateSchema.parse({
      completed: req.body.completed,
      progressPercentage: req.body.progressPercentage ?? req.body.progress_percentage,
    });

    const updated = await userProgressService.update(id, payload);
    res.json(updated);
  },
};

