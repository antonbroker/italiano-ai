import type { Request, Response } from 'express';
import { lessonService } from '../services/lesson.service';
import { lessonPayloadSchema } from '../validation/lesson.schema';
import { HttpError } from '../utils/httpError';

export const lessonController = {
  async list(_req: Request, res: Response) {
    const lessons = await lessonService.list();
    res.json(lessons);
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      throw new HttpError(400, 'Lesson id is required');
    }
    const lesson = await lessonService.findById(id);
    res.json(lesson);
  },

  async create(req: Request, res: Response) {
    const payload = lessonPayloadSchema.parse(req.body);
    const lesson = await lessonService.create(payload);
    res.status(201).json(lesson);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const payload = lessonPayloadSchema.partial().parse(req.body);
    const lesson = await lessonService.update(id, payload);
    res.json(lesson);
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    await lessonService.remove(id);
    res.status(204).send();
  },
};

