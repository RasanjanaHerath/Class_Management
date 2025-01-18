import { Router } from "express";
import { ClassCardController } from "../controller/ClassCardController";

const classCard_router = Router();

// Get all notices
classCard_router.get("/classCard", ClassCardController.getAll);

// Create a new notice
classCard_router.post("/classCard", ClassCardController.createClassCard);

export default classCard_router;