// src/index.ts
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./route/userRoutes"; // Import routes

AppDataSource.initialize().then(async () => {
    const app = express();

    app.use(express.json()); // Enable JSON body parsing

    // Use routes
    app.use("/api", userRoutes);

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });

}).catch(error => console.log(error));
