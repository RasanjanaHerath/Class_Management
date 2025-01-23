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
import assignmentRoutes from "./route/AssignmentRoutes";
import student_router from "./route/student.routes";
import classCard_router from "./route/classCard.routes";
import result_router from "./route/ResultRoutes";


AppDataSource.initialize().then(async () => {
    const app = express();

    app.use(cors());

    app.use(express.json()); // Enable JSON body parsing

    app.use(cors());

    // Use routes
    app.use("/api/user", userRoutes);
    app.use("/api/teacher", teacherRoutes);
    app.use("/api/institute", instituteRoutes);
    app.use("/api/notice", notice_router);
    app.use("/api/class",classRoutes);
    app.use("/api/assignment", assignmentRoutes);
    app.use("/api/class_card", classCard_router)
    app.use("/api/student", student_router);
    app.use("api/result", result_router);

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });

}).catch(error => console.log(error));
