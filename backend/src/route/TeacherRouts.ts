// src/routes/teacherRoutes.ts
import { Router } from 'express';
import { TeacherController } from '../controller/TeacherController';
import { jwtMiddleware } from '../middleware/jwtMiddleware';

const teacherRoutes = Router();


// get teachers
teacherRoutes.get('/getById/:id',TeacherController.getTeacher);

// getAll teachers
teacherRoutes.get('/get-all',TeacherController.getAll);

// teacherRoutes.get('/get-by-institute',jwtMiddleware,TeacherController.getTeacherByInstitute);

// Create a new teacher with validation and jwtMiddleware
teacherRoutes.post('/save',jwtMiddleware, TeacherController.save);

// Update a teacher's details with validation
teacherRoutes.put('/update/:id', TeacherController.updateTeacher);

// delete teacher
teacherRoutes.delete('/delete/:id',TeacherController.deleteTeacher);

teacherRoutes.get("/get-stats",jwtMiddleware,TeacherController.getStat);

export default teacherRoutes;