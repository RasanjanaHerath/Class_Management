// src/index.ts
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./route/userRoutes"; // Import routes
import instituteRoutes from "./route/InstituteRoutes";
import cors from 'cors';
import notice_router from "./route/notice.routes";
require('dotenv').config();
import classRoutes from "./route/classRoutes"; 
import teacherRoutes from "./route/TeacherRouts";


AppDataSource.initialize().then(async () => {
    const app = express();

    app.use(cors());

    app.use(express.json()); // Enable JSON body parsing

    app.use(cors());

    // Use routes
    app.use("/api", userRoutes);
    app.use("/api", instituteRoutes);
    app.use("/api", notice_router);
    app.use("/api",classRoutes);
    app.use("/api", teacherRoutes)

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });

}).catch(error => console.log(error));
