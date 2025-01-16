// src/routes/userRoutes.ts
import { Router } from "express";
import { InstituteController } from "../controller/InstituteController";
import { jwtMiddleware } from '../middleware/jwtMiddleware';

const instituteRoutes = Router();

// Middleware to protect all routes
instituteRoutes.use(jwtMiddleware);


// Get all users
instituteRoutes.get("/institute", InstituteController.getAll);

// Create a new user
instituteRoutes.post("/institute", InstituteController.createInstitute);

instituteRoutes.put("/institute/:id", InstituteController.updateInstitute);

instituteRoutes.delete("/institute/:id", InstituteController.deleteInstitute);

export default instituteRoutes;
