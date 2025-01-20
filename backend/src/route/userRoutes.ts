// src/routes/userRoutes.ts
import { Router } from "express";
import { UserController } from "../controller/UserController";

const userRoutes = Router();

// Get all users
userRoutes.get("/get-all", UserController.getAll);

// Create a new user
userRoutes.post("/create", UserController.createUser);

//Delete a User
userRoutes.delete("/delete/:id", UserController.deleteUser);

// Update a user
userRoutes.put("/update/:id",UserController.updateUser);

// Get a single user by ID
userRoutes.get("/getById/:id",UserController.getById);

// User login
userRoutes.post("/login", UserController.login);

export default userRoutes;

