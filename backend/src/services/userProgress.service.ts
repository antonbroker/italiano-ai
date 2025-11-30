import { UserProgress } from '../types';
import { notFoundError } from '../utils/httpError';
import { UserProgressModel } from '../models';

export const userProgressService = {
  async list(filter: { userEmail: string; lessonId?: string }): Promise<UserProgress[]> {
    const progress = await UserProgressModel.findAll({
      where: {
        userEmail: filter.userEmail,
        ...(filter.lessonId ? { lessonId: filter.lessonId } : {}),
      },
      order: [['createdAt', 'DESC']],
    });

    return progress.map((record) => ({
      id: record.id,
      userEmail: record.userEmail,
      lessonId: record.lessonId,
      completed: record.completed,
      progressPercentage: record.progressPercentage,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    }));
  },

  async upsert(payload: { userEmail: string; lessonId: string; completed: boolean; progressPercentage: number }): Promise<UserProgress> {
    const [record] = await UserProgressModel.upsert(
      {
        userEmail: payload.userEmail,
        lessonId: payload.lessonId,
        completed: payload.completed,
        progressPercentage: payload.progressPercentage,
      },
      { returning: true },
    );

    return {
      id: record.id,
      userEmail: record.userEmail,
      lessonId: record.lessonId,
      completed: record.completed,
      progressPercentage: record.progressPercentage,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    };
  },

  async update(id: string, updates: Partial<{ completed: boolean; progressPercentage: number }>): Promise<UserProgress> {
    const record = await UserProgressModel.findByPk(id);
    if (!record) {
      throw notFoundError('Progress not found');
    }

    await record.update({
      completed: updates.completed ?? record.completed,
      progressPercentage: updates.progressPercentage ?? record.progressPercentage,
    });

    return {
      id: record.id,
      userEmail: record.userEmail,
      lessonId: record.lessonId,
      completed: record.completed,
      progressPercentage: record.progressPercentage,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    };
  },
};

