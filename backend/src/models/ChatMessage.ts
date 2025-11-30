import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/sequelize';
import { ChatRole } from '../types';
import { createId } from '../utils/id';

interface ChatMessageAttributes {
  id: string;
  userEmail: string;
  message: string;
  role: ChatRole;
  lessonId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

type ChatMessageCreationAttributes = Optional<
  ChatMessageAttributes,
  'id' | 'lessonId' | 'role' | 'createdAt' | 'updatedAt'
>;

export class ChatMessageModel
  extends Model<ChatMessageAttributes, ChatMessageCreationAttributes>
  implements ChatMessageAttributes
{
  declare id: string;
  declare userEmail: string;
  declare message: string;
  declare role: ChatRole;
  declare lessonId: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

ChatMessageModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => createId(),
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_email',
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'tutor'),
      allowNull: false,
      defaultValue: 'user',
    },
    lessonId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'lesson_id',
      references: {
        model: 'lessons',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    tableName: 'chat_messages',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['user_email', 'created_at'],
      },
    ],
  },
);

