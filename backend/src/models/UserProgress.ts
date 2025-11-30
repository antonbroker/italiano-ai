import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/sequelize';
import { createId } from '../utils/id';

interface UserProgressAttributes {
  id: string;
  userEmail: string;
  lessonId: string;
  completed: boolean;
  progressPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

type UserProgressCreationAttributes = Optional<
  UserProgressAttributes,
  'id' | 'completed' | 'progressPercentage' | 'createdAt' | 'updatedAt'
>;

export class UserProgressModel
  extends Model<UserProgressAttributes, UserProgressCreationAttributes>
  implements UserProgressAttributes
{
  declare id: string;
  declare userEmail: string;
  declare lessonId: string;
  declare completed: boolean;
  declare progressPercentage: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

UserProgressModel.init(
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
    lessonId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'lesson_id',
      references: {
        model: 'lessons',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    progressPercentage: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
      field: 'progress_percentage',
      validate: {
        min: 0,
        max: 100,
      },
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
    tableName: 'user_progress',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['user_email', 'lesson_id'],
      },
    ],
  },
);

