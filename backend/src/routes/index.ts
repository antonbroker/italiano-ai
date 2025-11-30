import { Router } from 'express';
import lessonRoutes from './lesson.routes';
import chatRoutes from './chatMessage.routes';
import userProgressRoutes from './userProgress.routes';
import authRoutes from './auth.routes';
import { requireAuth } from '../middleware/authenticate';

const router = Router();

router.use('/auth', authRoutes);
router.use('/lessons', requireAuth, lessonRoutes);
router.use('/chat-messages', requireAuth, chatRoutes);
router.use('/user-progress', requireAuth, userProgressRoutes);

export default router;

