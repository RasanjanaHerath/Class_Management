// src/routes/teacherRoutes.ts
import { Router } from 'express';
import { TeacherController } from '../controller/TeacherController';
import { jwtMiddleware } from '../middleware/jwtMiddleware';
import { validateTeacher } from '../middleware/validateTeacher';

const teacherRoutes = Router();

// Middleware to protect all routes
teacherRoutes.use(jwtMiddleware);

// get teachers
teacherRoutes.get('/teacher/:id',TeacherController.getTeacher);

// getAll teachers
teacherRoutes.get('/teacher/',TeacherController.getAll);

// Create a new teacher with validation
teacherRoutes.post('/teacher', validateTeacher, TeacherController.save);

// Update a teacher's details with validation
teacherRoutes.put('/teacher/:id', validateTeacher, TeacherController.updateTeacher);

// delete teacher
teacherRoutes.delete('/teacher/:id',TeacherController.deleteTeacher);

export default teacherRoutes;
