import {Router} from "express";
import { classController } from "../controller/classController";

const router = Router();

//get all users
router.get("/classes",classController.getAll);

//create a new user
router.post("/classes",classController.createClass);

router.put("/classes/:id",classController.updateClass);

router.delete("/classes/:id",classController.deleteClass);

export default router;