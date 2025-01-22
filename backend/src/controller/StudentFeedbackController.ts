
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { StudentFeedback } from "../entity/StudentFeedBack";


export class StudentFeedBackController {
    // Get all
    static getAll = async (req: Request, res: Response) => {
        const studentFeedBackRepository = AppDataSource.getRepository(StudentFeedback);
        const studentFeedBacks = await studentFeedBackRepository.find();
        res.json(studentFeedBacks);
    };

    // Create 
    static createStudentFeedBack = async (req: Request, res: Response) => {
        const {classID,rating,comment } = req.body;
        const studentFeedBack = new StudentFeedback();
        studentFeedBack.classID = classID;
        studentFeedBack.rating = rating;
        studentFeedBack.comment = comment;
    

        const studentFeedBackRepository = AppDataSource.getRepository(StudentFeedback);
        await studentFeedBackRepository.save(studentFeedBack);
        res.json({ message: "Thank For your Feedback", studentFeedBack });
    };

    // Update 

    static updateStudentFeedBack = async (req: Request, res: Response) => {
        const {classID,rating,comment} = req.body;
        const studentFeedBackRepository = AppDataSource.getRepository(StudentFeedback);

        const studentFeedBack = await studentFeedBackRepository.findOneBy({ id: parseInt(req.params.id) });
        if (studentFeedBack) {
        studentFeedBack.classID = classID;
        studentFeedBack.rating = rating;
        studentFeedBack.comment = comment;
        

        await studentFeedBackRepository.save(studentFeedBack);
        res.json({ alert : "Feedback updated", studentFeedBack });
        } else {
        res.json({ alert : "Feedback not found" });
        }
    };

    // Delete
    static deleteStudentFeedBack = async (req: Request, res: Response) => {
        const studentFeedBackRepository = AppDataSource.getRepository(StudentFeedback);

        const studentFeedBack = await studentFeedBackRepository.findOneBy({ id: parseInt(req.params.id) });
        if (studentFeedBack) {
        await studentFeedBackRepository.remove(studentFeedBack);
        res.json({ alert : "FeedBack deleted" });
        } else {
        res.json({ alert : "Feedback not found" });
        }
    };
}
