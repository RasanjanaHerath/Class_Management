import { Router } from "express";
import { StudentMessegeController } from "../controller/studentMessegeController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";

const studentMessege_router = Router();

// Get all messeges
studentMessege_router.get("/get-all", StudentMessegeController.getAll);

// Create a new messege
studentMessege_router.post("/create",jwtMiddleware, StudentMessegeController.createStudentMessege);

// Updates
studentMessege_router.put("/update/:id", StudentMessegeController.updateStudentMessege);

// Delete messeges
studentMessege_router.delete("/delete/:id", StudentMessegeController.deleteStudentMessege);

export default studentMessege_router;