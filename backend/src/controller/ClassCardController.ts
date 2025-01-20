
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ClassCard } from "../entity/ClassCard";
import { Student } from "../entity/Student";
import { User } from "../entity/User";
import { Class } from "../entity/Class";



export class ClassCardController {
// Get ClassCards for a specific student with populated relations
static getAllMyclasses = async (req: Request, res: Response) => {
    try {
        const studentId = req.user.userId; // or from auth token
        const student = await AppDataSource.getRepository(Student).findOne({ where: { user: { id: studentId } } });
        const classCardRepository = AppDataSource.getRepository(ClassCard);
        const classCards = await classCardRepository.find({
            where: {
                student: student
            },
            relations: {
                classObject: {
                    institute: true,
                    teacher: {
                        user: true
                    }
                }
            },
            select: {
                classObject: {
                    subject: true,
                    grade: true,
                    scheduleDay: true,
                    startTime: true,
                    endTime: true,
                    institute: {
                        city: true,
                        name: true
                    },
                    teacher: {
                        user: {
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            }
        });

        res.json(classCards);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching class cards", error });
    }
};

    // Create a new ClassCard
    static createClassCard = async (req: Request, res: Response) => {
        console.log("ggtdy")
        const {classId} = req.body;

        const userId = req.user.userId;
        const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });

        if(!classId){
            res.status(400).json({message: "Please provide classId"});
            return;
        }
        const student = await AppDataSource.getRepository(Student).findOne({ where: { user: user } });
        if(!student){
            res.status(400).json({message: "Studnet not found"});
            return;
        }

        const classData = await AppDataSource.getRepository(Class).findOne({ where: { id: classId } });
        try {
            const existingClassCard = await AppDataSource.getRepository(ClassCard).findOne({ where: { student: student, classObject: classData } });
            if (existingClassCard) {
            res.json({ message: "You are already enrolled in this class" });
            return
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
