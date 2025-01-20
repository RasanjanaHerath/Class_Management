import {Router} from "express";
import { classController } from "../controller/classController";

const classRoutes = Router();

//get all users
classRoutes.get("/get-all",classController.getAll);

//create a new user
classRoutes.post("/createClass",classController.createClass);

classRoutes.put("/updateClass/:id",classController.updateClass);

classRoutes.delete("/deleteClass/:id",classController.deleteClass);

export default classRoutes;