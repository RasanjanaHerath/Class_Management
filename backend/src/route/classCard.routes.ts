import { Router } from "express";
import { ClassCardController } from "../controller/ClassCardController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";

const classCard_router = Router();

// Get all notices
classCard_router.get("/get-all-my", jwtMiddleware,ClassCardController.getAllMyclasses);

// Create a new notice
classCard_router.post("/create", jwtMiddleware,ClassCardController.createClassCard);

export default classCard_router;