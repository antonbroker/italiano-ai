import type { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { loginSchema, registerSchema } from '../validation/auth.schema';
import { HttpError } from '../utils/httpError';
import { clearAuthCookie, setAuthCookie, signAuthToken } from '../utils/authToken';

export const authController = {
  async me(req: Request, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.json(req.user);
  },

  async register(req: Request, res: Response) {
    const payload = registerSchema.parse(req.body);
    const exists = await userService.emailExists(payload.email);
    if (exists) {
      throw new HttpError(409, 'Email already registered');
    }

    const user = await userService.createWithPassword({
      email: payload.email,
      password: payload.password,
      fullName: payload.fullName,
    });

    const token = signAuthToken(user.id);
    setAuthCookie(res, token);

    res.status(201).json(user);
  },

  async login(req: Request, res: Response) {
    const payload = loginSchema.parse(req.body);
    const user = await userService.verifyCredentials(payload.email, payload.password);
    if (!user) {
      throw new HttpError(401, 'Invalid email or password');
    }

    const token = signAuthToken(user.id);
    setAuthCookie(res, token);

    res.json(user);
  },

  async logout(_req: Request, res: Response) {
    clearAuthCookie(res);
    res.status(204).send();
  },
};

