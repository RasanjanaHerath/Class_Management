// src/routes/userRoutes.ts
import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();

// Get all users
router.get("/users", UserController.getAll);

// Create a new user
router.post("/users", UserController.createUser);

export default router;
