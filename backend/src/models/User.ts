import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/sequelize';
import { createId } from '../utils/id';

interface UserAttributes {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  passwordHash: string;
  createdAt: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'avatarUrl' | 'createdAt'>;

export class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: string;
  declare email: string;
  declare fullName: string;
  declare avatarUrl: string | null;
  declare passwordHash: string;
  declare readonly createdAt: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => createId(),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'full_name',
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'avatar_url',
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password_hash',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    underscored: true,
    updatedAt: false,
  },
);

