// src/index.ts
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./route/userRoutes"; // Import routes
<<<<<<< HEAD
import InstituteRoutes from "./route/InstituteRoutes";
import cors from 'cors';

require('dotenv').config();
=======
import notice_router from "./route/notice.routes";
import cors from "cors"; // Import cors
>>>>>>> 0fcab49 (nootice)

AppDataSource.initialize().then(async () => {
    const app = express();

<<<<<<< HEAD
=======
    // Enable CORS for all origins
>>>>>>> 0fcab49 (nootice)
    app.use(cors());

    app.use(express.json()); // Enable JSON body parsing

    app.use(cors());

    // Use routes
    app.use("/api", userRoutes);
<<<<<<< HEAD
    app.use("/api", InstituteRoutes);
=======
    app.use("/api", notice_router);
>>>>>>> 0fcab49 (nootice)

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });

}).catch(error => console.log(error));
