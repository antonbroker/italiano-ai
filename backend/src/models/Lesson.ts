import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/sequelize';
import { LessonLevel } from '../types';
import { createId } from '../utils/id';

interface LessonAttributes {
  id: string;
  title: string;
  description: string | null;
  level: LessonLevel;
  topics: string[];
  duration: string | null;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}

type LessonCreationAttributes = Optional<
  LessonAttributes,
  'id' | 'description' | 'topics' | 'duration' | 'content' | 'createdAt' | 'updatedAt'
>;

export class LessonModel extends Model<LessonAttributes, LessonCreationAttributes> implements LessonAttributes {
  declare id: string;
  declare title: string;
  declare description: string | null;
  declare level: LessonLevel;
  declare topics: string[];
  declare duration: string | null;
  declare content: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

LessonModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => createId(),
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    level: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      allowNull: false,
    },
    topics: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: 'lessons',
    timestamps: true,
    underscored: true,
  },
);

