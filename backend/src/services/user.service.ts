import bcrypt from 'bcryptjs';
import { User } from '../types';
import { UserModel } from '../models';

const mapUser = (model: UserModel): User => ({
  id: model.id,
  email: model.email,
  fullName: model.fullName,
  avatarUrl: model.avatarUrl,
  createdAt: model.createdAt.toISOString(),
});

export const userService = {
  async getById(id: string): Promise<User | null> {
    const user = await UserModel.findByPk(id);
    return user ? mapUser(user) : null;
  },

  async emailExists(email: string): Promise<boolean> {
    const existing = await UserModel.findOne({ where: { email } });
    return Boolean(existing);
  },

  async createWithPassword(payload: {
    email: string;
    password: string;
    fullName: string;
    avatarUrl?: string | null;
  }): Promise<User> {
    const passwordHash = await bcrypt.hash(payload.password, 12);
    const user = await UserModel.create({
      email: payload.email,
      fullName: payload.fullName,
      avatarUrl: payload.avatarUrl ?? null,
      passwordHash,
    });

    return mapUser(user);
  },

  async verifyCredentials(email: string, password: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return null;
    }

    return mapUser(user);
  },
};

