import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Class } from "../entity/Class";
import { Teacher } from "../entity/Teacher";

export class classController {
    // Get all classes
    static getAll = async (req: Request, res: Response) => {
        const classRepository = AppDataSource.getRepository(Class);
        const classes = await classRepository.find();
        res.json(classes);
    };

    // Create a new class
    // static createClass = async (req: Request, res: Response) => {
    //     try {
    //         const { 
    //             subject, 
    //             grade, 
    //             startTime, 
    //             endTime, 
    //             feePerMonth, 
    //             scheduleDay, 
    //             numberOfStudents, 
    //             //modeOfTeaching 
    //         } = req.body;
    
            
    //         const newClass = new Class();
    //         newClass.subject = subject;
    //         newClass.grade = grade;
    //         newClass.startTime = startTime;
    //         newClass.endTime = endTime;
    //         newClass.feePerMonth = feePerMonth;
    //         newClass.scheduleDay = scheduleDay;
    //         newClass.numberOfStudents = numberOfStudents;
    //         //newClass.modeOfTeaching = modeOfTeaching;
    
    //         const classRepository = AppDataSource.getRepository(Class);
    //         await classRepository.save(newClass);
    
            
    //         res.json({ message: "Class created", class: newClass });
    //     } catch (error) {
    //         console.error("Error creating class:", error);
    //         res.status(500).json({ message: "Internal server error" });
    //     }
    // };

    static createClass = async (req: Request, res: Response) => {
        const { subject, teacherId, numberOfStudents, grade, startTime, endTime, feePerMonth, scheduleDay} = req.body;
        const classRepository = AppDataSource.getRepository(Class);
        const teacherRepository = AppDataSource.getRepository(Teacher);
    
        try {
          // Find the teacher by ID
          const teacher = await teacherRepository.findOne({ where: { teacherId } });
    
          if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
          }
    
          // Create a new class
          const newClass = new Class();
          newClass.subject = subject;
            newClass.grade = grade;
            newClass.startTime = startTime;
            newClass.endTime = endTime;
            newClass.feePerMonth = feePerMonth;
            newClass.scheduleDay = scheduleDay;
            newClass.numberOfStudents = numberOfStudents;
             newClass.teacher = teacher;
    
          // Save the new class
          await classRepository.save(newClass);
    
          res.status(201).json({ message: 'Class created successfully', class: newClass });
        } catch (error) {
          console.error('Error creating class:', error);
          res.status(500).json({ message: 'Error creating class', error: error.toString() });
        }
      };

    
    // Update a class
    // static updateClass = async (req: Request, res: Response) => {
    //     const {
    //         subject, 
    //         grade, 
    //         startTime, 
    //         endTime, 
    //         feePerMonth, 
    //         scheduleDay, 
    //         numberOfStudents, 
    //        // modeOfTeaching
    //     } = req.body;

    //     const classRepository = AppDataSource.getRepository(Class);

    //     // Find the class by ID from the request parameters
    //     const existingClass = await classRepository.findOneBy({ id: parseInt(req.params.id) });

    //     if (existingClass) {
    //         // Update class properties with the provided values
    //         existingClass.subject = subject;
    //         existingClass.subject = subject;
    //         //existingClass.batch = batch;
    //         existingClass.grade = grade;
    //         existingClass.startTime = startTime;
    //         existingClass.endTime = endTime;
    //         existingClass.scheduleDay = scheduleDay;
    //         existingClass.feePerMonth = feePerMonth;
    //         existingClass.numberOfStudents = numberOfStudents;

    //         // Save the updated class to the database
    //         await classRepository.save(existingClass);

    //         // Respond with a success message and the updated class
    //         res.json({ message: "Class updated", class: existingClass });
    //     } else {
    //         // If class not found, respond with a message
    //         res.status(404).json({ message: "Class not found" });
    //     }
    // };

    static updateClass = async (req: Request, res: Response) => {
        const { subject, teacherId, numberOfStudents, grade, startTime, endTime, feePerMonth, scheduleDay } = req.body;
        const classRepository = AppDataSource.getRepository(Class);
        const teacherRepository = AppDataSource.getRepository(Teacher);
    
        try {
          // Find the class by ID from the request parameters
          const existingClass = await classRepository.findOne({ where: { id: parseInt(req.params.id) } });
    
          if (!existingClass) {
            return res.status(404).json({ message: 'Class not found' });
          }
    
          // Find the teacher by ID
          const teacher = await teacherRepository.findOne({ where: { teacherId } });
    
          if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
          }
    
          // Update the class properties
          existingClass.subject = subject;
          existingClass.grade = grade;
          existingClass.startTime = startTime;
          existingClass.endTime = endTime;
          existingClass.scheduleDay = scheduleDay;
          existingClass.feePerMonth = feePerMonth;
          existingClass.numberOfStudents = numberOfStudents;
          existingClass.teacher = teacher; // Update the teacher for the class

          // Save the updated class to the database
          await classRepository.save(existingClass);

          // Respond with a success message and the updated class
          res.json({ message: 'Class updated', class: existingClass });
        } catch (error) {
          console.error('Error updating class:', error);
          res.status(500).json({ message: 'Error updating class', error: error.toString() });
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