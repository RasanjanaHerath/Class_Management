import {Router} from "express";
import {AdminController} from "../controller/AdminController";

const adminRoutes = Router();

adminRoutes.get("/statistics", AdminController.getStatistics);

export default adminRoutes;