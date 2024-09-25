// src/routes/userRoutes.ts
import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();

// Get all users
router.get("/users", UserController.getAll);

// Create a new user
router.post("/users", UserController.createUser);

//Delete a User
router.delete("/users/:id", UserController.deleteUser);

// Update a user
router.put("/users/:id",UserController.updateUser);

// // Get a single user by ID
// router.get("/users/:id",UserController.getById);

// // User login
// router.post("/login", UserController.login);

export default router;

