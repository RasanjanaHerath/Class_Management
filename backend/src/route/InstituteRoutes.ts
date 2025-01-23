import { Router } from "express";
import { InstituteController } from "../controller/InstituteController";
import { jwtMiddleware } from '../middleware/jwtMiddleware';
import { classController } from "../controller/classController";

const instituteRoutes = Router();

// Get all users
instituteRoutes.get("/get-all", InstituteController.getAll);

//Get institute by teacher
instituteRoutes.get("/get-by-teacher",jwtMiddleware,InstituteController.getInstitutesByTeacher)
instituteRoutes.get("/get-all-approved", InstituteController.getApprovedInstitutes);
instituteRoutes.get("/get-all-pending", InstituteController.getUnapprovedInstitutes);

instituteRoutes.patch("/approve/:action/:id", InstituteController.verifyOrReject);

// Create a new user
instituteRoutes.post("/create",jwtMiddleware, InstituteController.createInstitute);

instituteRoutes.post("/create-by-admin",jwtMiddleware, InstituteController.createInstituteAdmin);

instituteRoutes.put("/update/:id", InstituteController.updateInstitute);

instituteRoutes.delete("/delete/:id", InstituteController.deleteInstitute);

//get total number of classes and institutes and teachers
instituteRoutes.get("/institutes-stat", jwtMiddleware,InstituteController.getInstituteStatistics);
// Fetch distinct cities

instituteRoutes.get('/cities', InstituteController.getCities);

instituteRoutes.post("/create", jwtMiddleware,InstituteController.createInstitute);


// Fetch institutes by city
instituteRoutes.get("/institutes/:city", InstituteController.getInstitutesByCity);

// Fetch classes by institute
instituteRoutes.get("/classes/:instituteId", classController.getClassesByInstitute);

// Fetch classes by institute
instituteRoutes.get("/classes/user/:userId", InstituteController.getClassesByUserId);

// Fetch teachers by class
instituteRoutes.get("/teachers/:classId", classController.getTeachersByClass);



export default instituteRoutes;
