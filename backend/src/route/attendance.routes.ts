import { Router } from "express";
import { AttendanceController } from "../controller/AttendanceController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";

const attendance_router = Router();

// Get all 
attendance_router.get("/all", AttendanceController.getAll);

// Create 
attendance_router.post("/create",jwtMiddleware, AttendanceController.createAttendance);

// Updates
attendance_router.put("/update/:id", AttendanceController.updateAttendance);

// Delete Notice
attendance_router.delete("/delete/:id", AttendanceController.deleteAttendance);

export default attendance_router;