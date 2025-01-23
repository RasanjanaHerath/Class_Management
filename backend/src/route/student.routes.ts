import { Router } from "express";
import { StudentController } from "../controller/StudentController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";

const student_router = Router();
// student_router.use(jwtMiddleware);

// Get all students

student_router.get("/get-all", StudentController.getAll);


// Create a new student
student_router.post("/create",jwtMiddleware, StudentController.save);

// student_router.put("/update",jwtMiddleware, StudentController.);

// // Updates
// student_router.put("/notice/:id", StudentController.updateNotice);

// // Delete Notice
// student_router.delete("/notice/:id", StudentController.deleteNotice);

export default student_router;