import { z } from 'zod';
import { Lesson } from '../types';
import { notFoundError } from '../utils/httpError';
import { LessonModel } from '../models';

const lessonValidator = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  topics: z.array(z.string()),
  duration: z.string().nullable(),
  content: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const toLesson = (lesson: LessonModel): Lesson | null => {
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
    console.warn(
      `[lessons] Skipping invalid lesson ${lesson.id}`,
      parsed.error.flatten().fieldErrors,
    );
    return null;
  }

  return {
    ...parsed.data,
    createdAt: parsed.data.createdAt.toISOString(),
    updatedAt: parsed.data.updatedAt.toISOString(),
  };
};

const ensureLesson = (lesson: LessonModel | null): Lesson => {
  if (!lesson) {
    throw notFoundError('Lesson not found');
  }
  const parsed = toLesson(lesson);
  if (!parsed) {
    throw notFoundError('Lesson not found');
  }
  return parsed;
};

export const lessonService = {
  async list(): Promise<Lesson[]> {
    const lessons = await LessonModel.findAll({ order: [['createdAt', 'ASC']] });
    return lessons.map(toLesson).filter((lesson): lesson is Lesson => Boolean(lesson));
  },

  async findById(id: string): Promise<Lesson> {
    const lesson = await LessonModel.findByPk(id);
    return ensureLesson(lesson);
  },

  async create(payload: {
    title: string;
    description?: string | null;
    level: string;
    topics?: string[];
    duration?: string | null;
    content?: string | null;
  }): Promise<Lesson> {
    const lesson = await LessonModel.create({
      title: payload.title,
      description: payload.description ?? null,
      level: payload.level as Lesson['level'],
      topics: payload.topics ?? [],
      duration: payload.duration ?? null,
      content: payload.content ?? null,
    });

    return ensureLesson(lesson);
  },

  async update(id: string, payload: Partial<Lesson>): Promise<Lesson> {
    const lesson = await LessonModel.findByPk(id);
    if (!lesson) {
      throw notFoundError('Lesson not found');
    }

    await lesson.update({
      title: payload.title ?? lesson.title,
      description: payload.description ?? lesson.description,
      level: (payload.level as Lesson['level']) ?? lesson.level,
      topics: payload.topics ?? lesson.topics,
      duration: payload.duration ?? lesson.duration,
      content: payload.content ?? lesson.content,
    });

    return ensureLesson(lesson);
  },

  async remove(id: string): Promise<void> {
    await LessonModel.destroy({ where: { id } });
  },
};

