import { Router } from "express";
import { NoticeController } from "../controller/NoticeController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";

const notice_router = Router();

// Get all notices
notice_router.get("/all", NoticeController.getAll);

// Create a new notice
notice_router.post("/create",jwtMiddleware, NoticeController.createNotice);

// Updates
notice_router.put("/update/:id", NoticeController.updateNotice);

// Delete Notice
notice_router.delete("/delete/:id", NoticeController.deleteNotice);

export default notice_router;