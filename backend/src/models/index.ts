import { ChatMessageModel } from './ChatMessage';
import { LessonModel } from './Lesson';
import { UserModel } from './User';
import { UserProgressModel } from './UserProgress';

let initialized = false;

export const initModels = () => {
  if (initialized) {
    return;
  }

  LessonModel.hasMany(UserProgressModel, {
    foreignKey: 'lessonId',
    sourceKey: 'id',
    as: 'progress',
  });
  UserProgressModel.belongsTo(LessonModel, {
    foreignKey: 'lessonId',
    targetKey: 'id',
    as: 'lesson',
  });

  LessonModel.hasMany(ChatMessageModel, {
    foreignKey: 'lessonId',
    sourceKey: 'id',
    as: 'chatMessages',
  });
  ChatMessageModel.belongsTo(LessonModel, {
    foreignKey: 'lessonId',
    targetKey: 'id',
    as: 'lesson',
  });

  initialized = true;
};

export { LessonModel, ChatMessageModel, UserModel, UserProgressModel };

