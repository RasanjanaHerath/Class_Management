
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Notice } from "../entity/Notice";
import { Class } from "../entity/Class";


export class NoticeController {
    // Get all notices
    static getAll = async (req: Request, res: Response) => {
        const noticeRepository = AppDataSource.getRepository(Notice);
        const classRepository = AppDataSource.getRepository(Class);
        const classes = await classRepository.find({ relations: ['teacher', 'institute', 'students'] });
        if (!Array.isArray(classes)) {
          return res.status(500).json({ message: 'Error fetching classes' });
        }
        const notices = await noticeRepository.find();
        res.json(notices);
    };

    // Create a new notice
    static createNotice = async (req: Request, res: Response) => {
        const { visibilityRole ,title, message } = req.body;
        const notice = new Notice();
        notice.visibilityRole = visibilityRole;
        notice.title = title;
        notice.message = message;
    

        const noticeRepository = AppDataSource.getRepository(Notice);
        await noticeRepository.save(notice);
        res.json({ message: "Notice created", notice });
    };

    // Update a Notice

    static updateNotice = async (req: Request, res: Response) => {
        const {visibilityRole ,title,message} = req.body;
        const noticeRepository = AppDataSource.getRepository(Notice);

        const notice = await noticeRepository.findOneBy({ id: parseInt(req.params.id) });
        if (notice) {
        notice.visibilityRole = visibilityRole;
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


    static getNoticeForInstitute = async (req: Request, res: Response) => {
        const noticeRepository = AppDataSource.getRepository(Notice);
        const notices = await noticeRepository.find({ where: { visibilityRole: "institute" } });
        res.json(notices);
    }
}
