import { Router } from 'express';
import { userProgressController } from '../controllers/userProgress.controller';

const router = Router();

router.get('/', userProgressController.list);
router.post('/', userProgressController.upsert);
router.put('/:id', userProgressController.update);

export default router;

