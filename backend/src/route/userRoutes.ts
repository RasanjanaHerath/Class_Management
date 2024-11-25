// src/routes/userRoutes.ts
import { Router } from "express";
import { UserController } from "../controller/UserController";

const userRoutes = Router();

// Get all users
userRoutes.get("/users", UserController.getAll);

// Create a new user
userRoutes.post("/users", UserController.createUser);

//Delete a User
userRoutes.delete("/users/:id", UserController.deleteUser);

// Update a user
userRoutes.put("/users/:id",UserController.updateUser);

// Get a single user by ID
userRoutes.get("/users/:id",UserController.getById);

// User login
userRoutes.post("/login", UserController.login);

export default userRoutes;

