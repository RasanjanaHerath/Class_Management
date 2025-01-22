
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Institute } from "../entity/Institute";
import { Teacher } from "../entity/Teacher";
import { Student } from "../entity/Student";


export class AdminController {

    static getStatistics = async (req: Request, res: Response) => {
        // total institutes approved, rejected , 
        // total teachers
        // total students

        const instituteRepository = AppDataSource.getRepository(Institute);
        const teacherRepository = AppDataSource.getRepository(Teacher);
        const studentRepository = AppDataSource.getRepository(Student);

        const institutes = await instituteRepository.find();
        const teachers = await teacherRepository.find();
        const students = await studentRepository.find();

        const totalInstitutes = institutes.length;
        const totalTeachers = teachers.length;
        const totalStudents = students.length;

        const approvedInstitutes = institutes.filter(institute => institute.isverified).length;
        const rejectedInstitutes = institutes.filter(institute => !institute.isverified).length;

        res.json({
            totalInstitutes,
            totalTeachers,
            totalStudents,
            approvedInstitutes,
            rejectedInstitutes
        });


    }


}