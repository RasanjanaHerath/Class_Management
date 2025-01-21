import {Router} from "express";
import { classController } from "../controller/classController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
const classRoutes = Router();

//get all users
classRoutes.get("/get-all",classController.getAll);

classRoutes.get("/get-by-id/:id",classController.getClassById)

//create a new user
classRoutes.post("/create",jwtMiddleware,classController.createClass);

classRoutes.put("/update/:id",classController.updateClass);

classRoutes.delete("/delete/:id",classController.deleteClass);

export default classRoutes;