import { Router } from "express";
import { InstituteController } from "../controller/InstituteController";
import { jwtMiddleware } from '../middleware/jwtMiddleware';
import { classController } from "../controller/classController";

const instituteRoutes = Router();

// Get all users
instituteRoutes.get("/getAll", InstituteController.getAll);

// Create a new user
instituteRoutes.post("/create",jwtMiddleware, InstituteController.createInstitute);

instituteRoutes.put("/update/:id", InstituteController.updateInstitute);

instituteRoutes.delete("/delete/:id", InstituteController.deleteInstitute);


// Fetch distinct cities

instituteRoutes.get('/cities', InstituteController.getCities);

instituteRoutes.post("/create", jwtMiddleware,InstituteController.createInstitute);


// Fetch institutes by city
instituteRoutes.get("/institutes/:city", InstituteController.getInstitutesByCity);

// Fetch classes by institute
instituteRoutes.get("/classes/:instituteId", classController.getClassesByInstitute);

// Fetch teachers by class
instituteRoutes.get("/teachers/:classId", classController.getTeachersByClass);

export default instituteRoutes;
