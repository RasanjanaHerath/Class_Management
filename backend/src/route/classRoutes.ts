import {Router} from "express";
import { classController } from "../controller/classController";

const classRoutes = Router();

//get all users
classRoutes.get("/classes",classController.getAll);

//create a new user
classRoutes.post("/classes",classController.createClass);

classRoutes.put("/classes/:id",classController.updateClass);

classRoutes.delete("/classes/:id",classController.deleteClass);

export default classRoutes;