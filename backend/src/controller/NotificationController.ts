// src/controllers/NotificationController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Notification } from "../entity/Notification";
import { User } from "../entity/User";

export class NotificationController {
  // Create a new notification
  static createNotification = async (req: Request, res: Response) => {
    const { title, message, recipientType } = req.body;
  
    if (!title || !message || !recipientType) {
      return res
        .status(400)
        .json({ message: "Title, message, and recipient type are required." });
    }
  
    try {
      // Create a new notification entity
      const notification = new Notification();
      notification.title = title;
      notification.message = message;
  
      const userRepository = AppDataSource.getRepository(User);
      const notificationRepository = AppDataSource.getRepository(Notification);
  
      // Fetch and associate the notification with all users of the specified recipient type
      let users: User[] = [];
      if (recipientType === "teacher") {
        users = await userRepository.find({ where: { role: "teacher" } });
      } else if (recipientType === "student") {
        users = await userRepository.find({ where: { role: "student" } });
      } else if (recipientType === "institute") {
        users = await userRepository.find({ where: { role: "institute" } });
      } else if (recipientType === "all") {
        users = await userRepository.find(); // All users
      } else {
        return res.status(400).json({ message: "Invalid recipient type." });
      }
  
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found for this role." });
      }
  
      // Save notification for all users
      await Promise.all(
        users.map(async (user) => {
          const userNotification = new Notification();
          userNotification.title = title;
          userNotification.message = message;
          userNotification.user = user; // Associate the user
          await notificationRepository.save(userNotification);
        })
      );
  
      return res.status(201).json({
        message: `Notification sent to all ${recipientType} users.`,
      });
    } catch (error) {
      console.error("Error creating notification:", error);
      return res
        .status(500)
        .json({ message: "Error creating notification.", error });
    }
  };

  // Get all notifications
  static getNotifications = async (req: Request, res: Response) => {
    try {
      const notifications = await AppDataSource.getRepository(Notification).find();
      res.status(200).json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Error fetching notifications.", error });
    }
  };

  // Get notifications by recipient type
//   static getNotificationsByRecipientType = async (req: Request, res: Response) => {
//     const { recipientType } = req.params;

//     try {
//       const notifications = await AppDataSource.getRepository(Notification).find({
//         where: { recipientType },
//       });
//       res.status(200).json(notifications);
//     } catch (error) {
//       console.error("Error fetching notifications by recipient type:", error);
//       res.status(500).json({ message: "Error fetching notifications.", error });
//     }
//   };

  // Delete a notification
  static deleteNotification = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const notificationRepository = AppDataSource.getRepository(Notification);
      const notification = await notificationRepository.findOneBy({ id: parseInt(id) });

      if (!notification) {
        return res.status(404).json({ message: "Notification not found." });
      }

      await notificationRepository.remove(notification);
      res.status(200).json({ message: "Notification deleted successfully." });
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ message: "Error deleting notification.", error });
    }
  };
}
