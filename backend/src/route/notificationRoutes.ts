// src/routes/notificationRoutes.ts
import { Router } from "express";
import { NotificationController } from "../controller/NotificationController";

const router = Router();

router.post("/create", NotificationController.createNotification);
router.get("/notifications", NotificationController.getNotifications);
//router.get("/notifications/:recipientType", NotificationController.getNotificationsByRecipientType);
router.delete("/notifications/:id", NotificationController.deleteNotification);

export default router;
