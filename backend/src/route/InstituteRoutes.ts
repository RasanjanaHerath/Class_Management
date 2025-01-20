// src/routes/userRoutes.ts
import { Router } from "express";
import { InstituteController } from "../controller/InstituteController";
import { jwtMiddleware } from '../middleware/jwtMiddleware';

const instituteRoutes = Router();

// Get all users
instituteRoutes.get("/getAll", InstituteController.getAll);

// Create a new user
instituteRoutes.post("/create",jwtMiddleware, InstituteController.createInstitute);

instituteRoutes.put("/update/:id", InstituteController.updateInstitute);

instituteRoutes.delete("/delete/:id", InstituteController.deleteInstitute);

export default instituteRoutes;
