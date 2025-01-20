
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Notice } from "../entity/Notice";


export class NoticeController {
    // Get all notices
    static getAll = async (req: Request, res: Response) => {
        const noticeRepository = AppDataSource.getRepository(Notice);
        const notices = await noticeRepository.find();
        res.json(notices);
    };

    // Create a new notice
    static createNotice = async (req: Request, res: Response) => {
        const { role,title, message } = req.body;
        const notice = new Notice();
        notice.role = role;
        notice.title = title;
        notice.message = message;
    

        const noticeRepository = AppDataSource.getRepository(Notice);
        await noticeRepository.save(notice);
        res.json({ message: "Notice created", notice });
    };

    // Update a Notice

    static updateNotice = async (req: Request, res: Response) => {
        const {role ,title,message} = req.body;
        const noticeRepository = AppDataSource.getRepository(Notice);

        const notice = await noticeRepository.findOneBy({ id: parseInt(req.params.id) });
        if (notice) {
        notice.role = role;
        notice.title = title;
        notice.message = message;
        

        await noticeRepository.save(notice);
        res.json({ alert : "User updated", notice });
        } else {
        res.json({ alert : "User not found" });
        }
    };

    // Delete a Notice
    static deleteNotice = async (req: Request, res: Response) => {
        const noticeRepository = AppDataSource.getRepository(Notice);

        const notice = await noticeRepository.findOneBy({ id: parseInt(req.params.id) });
        if (notice) {
        await noticeRepository.remove(notice);
        res.json({ alert : "Notice deleted" });
        } else {
        res.json({ alert : "Notice not found" });
        }
    };
}
