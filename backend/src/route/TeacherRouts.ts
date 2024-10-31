import { Router } from 'express';
import { TeacherController } from '../controller/TeacherController';

const router = Router();

router.get('/teacher/:id', TeacherController.getTeacher);
router.put('/teacher/:id', TeacherController.updateTeacher);

export default router;
