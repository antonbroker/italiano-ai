import { Router } from 'express';
import { chatMessageController } from '../controllers/chatMessage.controller';

const router = Router();

router.get('/', chatMessageController.list);
router.post('/', chatMessageController.create);

export default router;

