import { ChatMessage } from '../types';
import { ChatMessageModel } from '../models';

export const chatMessageService = {
  async listByUser(userEmail: string, limit = 100): Promise<ChatMessage[]> {
    const messages = await ChatMessageModel.findAll({
      where: { userEmail },
      order: [['createdAt', 'ASC']],
      limit,
    });

    return messages.map((msg) => ({
      id: msg.id,
      userEmail: msg.userEmail,
      message: msg.message,
      role: msg.role,
      lessonId: msg.lessonId,
      createdAt: msg.createdAt.toISOString(),
      updatedAt: msg.updatedAt.toISOString(),
    }));
  },

  async create(payload: {
    userEmail: string;
    message: string;
    role: 'user' | 'tutor';
    lessonId?: string | null;
  }): Promise<ChatMessage> {
    const message = await ChatMessageModel.create({
      userEmail: payload.userEmail,
      message: payload.message,
      role: payload.role,
      lessonId: payload.lessonId ?? null,
    });

    return {
      id: message.id,
      userEmail: message.userEmail,
      message: message.message,
      role: message.role,
      lessonId: message.lessonId,
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString(),
    };
  },
};

