import {Router} from "express";
import { AssignmentmentController } from '../controller/AssignmentmentController';

const assignmentRoutes = Router();

// Route to get all assignments
assignmentRoutes.get('/assignment/', AssignmentmentController.getAll);

// Route to assignments by ID
assignmentRoutes.get('/assignment/:id', AssignmentmentController.getAssignmentById);

// Route to create a new announcement
assignmentRoutes.post('/assignments/', AssignmentmentController.createAssignment);

// Route to update an existing assignments
//assignmentRoutes.put('/assignment:id', AssignmentmentController.);

// Route to delete an assignments
//assignmentRoutes.delete('/assignment:id', AssignmentmentController);

export default assignmentRoutes;