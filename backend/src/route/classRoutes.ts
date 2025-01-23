import {Router} from "express";
import { classController } from "../controller/classController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
const classRoutes = Router();

//get all class
classRoutes.get("/get-all",classController.getAll);
classRoutes.get("/get-all-by-inst/:instituteId",classController.getClassesByInstitute);
classRoutes.get("/get-students-by-class/:classId",classController.getStudentsByClass);

//get class by id
classRoutes.get("/get-by-id/:id",classController.getClassById)

//get class by teacher id
classRoutes.get("/get-by-teacher",jwtMiddleware,classController.getClassesByTeacher)

//get students by class id
classRoutes.get("/get-students/:id",classController.getStudentsByClass)

//create a new class
classRoutes.post("/create",jwtMiddleware,classController.createClass);

//update a class
classRoutes.put("/update/:id",jwtMiddleware,classController.updateClass);

//delete a class
classRoutes.delete("/delete/:id",classController.deleteClass);

export default classRoutes;