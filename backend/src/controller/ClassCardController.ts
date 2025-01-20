
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ClassCard } from "../entity/ClassCard";
import { Student } from "../entity/Student";
import { User } from "../entity/User";
import { Class } from "../entity/Class";



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
        const {classId} = req.body;

        const userId = req.user.userId;
        const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });


        if(!classId){
            res.json({message: "Please provide classId"})
        }
        const student = await AppDataSource.getRepository(Student).findOne({ where: { user: user } });

        if(!student){
            res.json({message: "Student not found"})
        }

        const classData = await AppDataSource.getRepository(Class).findOne({ where: { id: classId } });
        try {
            const existingClassCard = await AppDataSource.getRepository(ClassCard).findOne({ where: { student: student, classObject: classData } });
            if (existingClassCard) {
            return res.json({ message: "You are already enrolled in this class" });
            }

            const classCard = new ClassCard();
            classCard.student = student;
            classCard.classObject = classData;

            await AppDataSource.getRepository(ClassCard).save(classCard);
            res.json({ message: "ClassCard created", classCard });
        } catch (err) {
            res.json({ message: "Error", error: err.message });
        }
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
