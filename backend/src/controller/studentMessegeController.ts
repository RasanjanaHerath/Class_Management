
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { StudentMessege } from "../entity/StudentMesseges";


export class StudentMessegeController {
    // Get all notices
    static getAll = async (req: Request, res: Response) => {
        const studentMessegeRepository = AppDataSource.getRepository(StudentMessege);
        const StudentMesseges = await studentMessegeRepository.find();
        res.json(StudentMesseges);
    };

    // Create a new notice
    static createStudentMessege = async (req: Request, res: Response) => {
        const { institute,title,message } = req.body;
        
        const studentMessegeRepository = AppDataSource.getRepository(StudentMessege);
        
        const studentMessege = new StudentMessege();
        studentMessege.institute = institute;
        studentMessege.title = title;
        studentMessege.message = message;
    

        // const studentMessegeRepository = AppDataSource.getRepository(StudentMessege);
        await studentMessegeRepository.save(studentMessege);
        res.json({ message: "Student messege created", studentMessege });
    };

    // Update a Notice

    static updateStudentMessege = async (req: Request, res: Response) => {
        const {institute ,title,message} = req.body;
        const studentMessegeRepository = AppDataSource.getRepository(StudentMessege);

        const studentMessege = await studentMessegeRepository.findOneBy({ id: parseInt(req.params.id) });
        if (studentMessege) {
        studentMessege.institute = institute;
        studentMessege.title = title;
        studentMessege.message = message;
        

        await studentMessegeRepository.save(studentMessege);
        res.json({ alert : "User updated", studentMessege });
        } else {
        res.json({ alert : "User not found" });
        }
    };

    // Delete a Notice
    static deleteStudentMessege = async (req: Request, res: Response) => {
        const studentMessegeRepository = AppDataSource.getRepository(StudentMessege);

        const studentMessege = await studentMessegeRepository.findOneBy({ id: parseInt(req.params.id) });
        if (studentMessege) {
        await studentMessegeRepository.remove(studentMessege);
        res.json({ alert : "Notice deleted" });
        } else {
        res.json({ alert : "Notice not found" });
        }
    };
}
