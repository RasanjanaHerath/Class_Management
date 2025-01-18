
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ClassCard } from "../entity/ClassCard";


export class ClassCardController {
    // Get all ClassCards
    static getAll = async (req: Request, res: Response) => {
        const classCardRepository = AppDataSource.getRepository(ClassCard);
        const classCards = await classCardRepository.find();
        res.json(classCards);
    };

    // Create a new ClassCard
    static createClassCard = async (req: Request, res: Response) => {
        console.log("ggtdy")
        const {city,institiute,calssName,teacher } = req.body;
        const classCard = new ClassCard();
        classCard.city = city;
        classCard.institiute = institiute;
        classCard.calssName = calssName;
        classCard.teacher = teacher;
    

        const noticeRepository = AppDataSource.getRepository(ClassCard);
        await noticeRepository.save(classCard);
        res.json({ message: "Notice created", classCard });
    };

    // // Update a ClassCard

    // static updateNotice = async (req: Request, res: Response) => {
    //     const {role ,title,message} = req.body;
    //     const noticeRepository = AppDataSource.getRepository(Notice);

    //     const notice = await noticeRepository.findOneBy({ id: parseInt(req.params.id) });
    //     if (notice) {
    //     notice.role = role;
    //     notice.title = title;
    //     notice.message = message;
        

    //     await noticeRepository.save(notice);
    //     res.json({ alert : "User updated", notice });
    //     } else {
    //     res.json({ alert : "User not found" });
    //     }
    // };

    // // Delete a Notice
    // static deleteNotice = async (req: Request, res: Response) => {
    //     const noticeRepository = AppDataSource.getRepository(Notice);

    //     const notice = await noticeRepository.findOneBy({ id: parseInt(req.params.id) });
    //     if (notice) {
    //     await noticeRepository.remove(notice);
    //     res.json({ alert : "Notice deleted" });
    //     } else {
    //     res.json({ alert : "Notice not found" });
    //     }
    // };
}
