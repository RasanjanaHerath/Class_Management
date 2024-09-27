// src/routes/userRoutes.ts
import { Router } from "express";
import { InstituteController } from "../controller/InstituteController";

const router = Router();

// Get all users
router.get("/institute", InstituteController.getAll);

// Create a new user
router.post("/institute", InstituteController.createInstitute);

router.put("/institute/:id", InstituteController.updateInstitute);

router.delete("/institute/:id", InstituteController.deleteInstitute);

export default router;
