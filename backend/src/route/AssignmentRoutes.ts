import {Router} from "express";
import { AssignmentController } from '../controller/AssignmentmentController';
import { jwtMiddleware } from "../middleware/jwtMiddleware";

const assignmentRoutes = Router();

// Route to get all assignments
assignmentRoutes.get('/getAll', AssignmentController.getAll);

// Route to assignments by ID
assignmentRoutes.get('/getById/:id', AssignmentController.getById);

// Get assignments by teacher and institute
assignmentRoutes.get('/get-class-by-teacher', jwtMiddleware, AssignmentController.getAssignmentsByTeacherAndInstitute);


// Route to create a new announcement
assignmentRoutes.post('/create',jwtMiddleware, AssignmentController.createAssignment);

// Route to update an existing assignments
assignmentRoutes.put('/update/:id', AssignmentController.updateAssignment);

//Route to delete an assignments
assignmentRoutes.delete('/delete/:id', AssignmentController.deleteAssignment);

export default assignmentRoutes;