import type { Request, Response } from 'express';
import { chatMessageService } from '../services/chatMessage.service';
import { chatMessageCreateSchema, chatMessageQuerySchema } from '../validation/chatMessage.schema';

export const chatMessageController = {
  async list(req: Request, res: Response) {
    const params = chatMessageQuerySchema.parse({
      userEmail: req.query.userEmail ?? req.query.user_email,
      limit: req.query.limit,
    });

    const messages = await chatMessageService.listByUser(params.userEmail, params.limit ?? 100);
    res.json(messages);
  },

  async create(req: Request, res: Response) {
    const payload = chatMessageCreateSchema.parse({
      userEmail: req.body.userEmail ?? req.body.user_email,
      message: req.body.message,
      role: req.body.role,
      lessonId: req.body.lessonId ?? req.body.lesson_id,
    });

    const created = await chatMessageService.create(payload);
    res.status(201).json(created);
  },
};

