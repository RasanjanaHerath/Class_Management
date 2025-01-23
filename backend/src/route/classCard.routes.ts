import { Router } from "express";
import { ClassCardController } from "../controller/ClassCardController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";

const classCard_router = Router();

// Get all classCards for a specific student
classCard_router.get("/get-all-my", jwtMiddleware,ClassCardController.getAllMyclasses);

// Create a new classCard
classCard_router.post("/create", jwtMiddleware,ClassCardController.createClassCard);

// delete a classCard
classCard_router.delete("/delete/:id", jwtMiddleware,ClassCardController.deleteClassCard);
export default classCard_router;