import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Class } from "../entity/Class";

export class classController {
    // Get all classes
    static getAll = async (req: Request, res: Response) => {
        const classRepository = AppDataSource.getRepository(Class);
        const classes = await classRepository.find();
        res.json(classes);
    };

    // Create a new class
    static createClass = async (req: Request, res: Response) => {
        try {
            const { 
                instituteName, 
                subject, 
                batch, 
                grade, 
                dateTime, 
                teacherName, 
                feePerMonth, 
                teacherExperience, 
                numberOfStudents, 
                teacherContactPhoneNumber, 
                modeOfTeaching 
            } = req.body;
    
            
            const newClass = new Class();
            newClass.instituteName = instituteName;
            newClass.subject = subject;
            newClass.batch = batch;
            newClass.grade = grade;
            newClass.dateTime = dateTime;
            newClass.teacherName = teacherName;
            newClass.feePerMonth = feePerMonth;
            newClass.teacherExperience = teacherExperience;
            newClass.numberOfStudents = numberOfStudents;
            newClass.teacherContactPhoneNumber = teacherContactPhoneNumber;
            newClass.modeOfTeaching = modeOfTeaching;
    
            const classRepository = AppDataSource.getRepository(Class);
            await classRepository.save(newClass);
    
            
            res.json({ message: "Class created", class: newClass });
        } catch (error) {
            console.error("Error creating class:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    
    // Update a class
    static updateClass = async (req: Request, res: Response) => {
        const {
            instituteName,
            subject,
            batch,
            grade,
            dateTime,
            teacherName,
            feePerMonth,
            teacherExperience,
            numberOfStudents,
            teacherContactPhoneNumber,
            modeOfTeaching
        } = req.body;

        const classRepository = AppDataSource.getRepository(Class);

        // Find the class by ID from the request parameters
        const existingClass = await classRepository.findOneBy({ id: parseInt(req.params.id) });

        if (existingClass) {
            // Update class properties with the provided values
            existingClass.instituteName = instituteName;
            existingClass.subject = subject;
            existingClass.batch = batch;
            existingClass.grade = grade;
            existingClass.dateTime = dateTime;
            existingClass.teacherName = teacherName;
            existingClass.feePerMonth = feePerMonth;
            existingClass.teacherExperience = teacherExperience;
            existingClass.numberOfStudents = numberOfStudents;
            existingClass.teacherContactPhoneNumber = teacherContactPhoneNumber;
            existingClass.modeOfTeaching = modeOfTeaching;

            // Save the updated class to the database
            await classRepository.save(existingClass);

            // Respond with a success message and the updated class
            res.json({ message: "Class updated", class: existingClass });
        } else {
            // If class not found, respond with a message
            res.status(404).json({ message: "Class not found" });
        }
    };



    // Delete a class
    static deleteClass = async (req: Request, res: Response) => {
        const classRepository = AppDataSource.getRepository(Class);

        // Find the class by ID from the request parameters
        const existingClass = await classRepository.findOneBy({ id: parseInt(req.params.id) });

        if (existingClass) {
            // Remove the class if found
            await classRepository.remove(existingClass);
            // Respond with a success message
            res.json({ message: "Class deleted" });
        } else {
            // If the class is not found, respond with a message
            res.status(404).json({ message: "Class not found" });
        }
    };
    

}