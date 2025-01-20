// src/routes/teacherRoutes.ts
import { Router } from 'express';
import { TeacherController } from '../controller/TeacherController';
import { jwtMiddleware } from '../middleware/jwtMiddleware';

const teacherRoutes = Router();


// get teachers
teacherRoutes.get('/getById/:id',TeacherController.getTeacher);

// getAll teachers
teacherRoutes.get('/get-all',TeacherController.getAll);

// Create a new teacher with validation and jwtMiddleware
teacherRoutes.post('/save',jwtMiddleware, TeacherController.save);

// Update a teacher's details with validation
teacherRoutes.put('/update/:id', TeacherController.updateTeacher);

// delete teacher
teacherRoutes.delete('/delete/:id',TeacherController.deleteTeacher);

export default teacherRoutes;