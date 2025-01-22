import { Router } from "express";
import { StudentFeedBackController } from "../controller/StudentFeedbackController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";

const studentFeedBack_router = Router();

// Get all notices
studentFeedBack_router.get("/all", StudentFeedBackController.getAll);

// Create a new notice
studentFeedBack_router.post("/create",jwtMiddleware, StudentFeedBackController.createStudentFeedBack);

// Updates
studentFeedBack_router.put("/update/:id", StudentFeedBackController.updateStudentFeedBack);

// Delete Notice
studentFeedBack_router.delete("/delete/:id", StudentFeedBackController.deleteStudentFeedBack);

export default studentFeedBack_router;