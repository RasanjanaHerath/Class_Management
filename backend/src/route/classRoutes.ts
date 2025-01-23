import {Router} from "express";
import { classController } from "../controller/classController";

const classRoutes = Router();

//get all users
classRoutes.get("/get-all",classController.getAll);
classRoutes.get("/get-all-by-inst/:instituteId",classController.getClassesByInstitute);
classRoutes.get("/get-students-by-class/:classId",classController.getStudentsByClass);

//create a new user
classRoutes.post("/create",classController.createClass);

classRoutes.put("/update/:id",classController.updateClass);

classRoutes.delete("/delete/:id",classController.deleteClass);

export default classRoutes;