import { Router } from "express";
import { NoticeController } from "../controller/NoticeController";

const notice_router = Router();

// Get all notices
notice_router.get("/notice", NoticeController.getAll);

// Create a new notice
notice_router.post("/notice", NoticeController.createNotice);

// Updates
notice_router.put("/notice/:id", NoticeController.updateNotice);

// Delete Notice
notice_router.delete("/notice/:id", NoticeController.deleteNotice);

export default notice_router;