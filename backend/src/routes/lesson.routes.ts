import { Router } from 'express';
import { lessonController } from '../controllers/lesson.controller';

const router = Router();

router.get('/', lessonController.list);
router.get('/:id', lessonController.getById);
router.post('/', lessonController.create);
router.put('/:id', lessonController.update);
router.delete('/:id', lessonController.remove);

export default router;

