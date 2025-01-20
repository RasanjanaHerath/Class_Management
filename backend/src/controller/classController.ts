import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Class } from "../entity/Class";
import { Teacher } from "../entity/Teacher";
import { Institute } from "../entity/Institute";



export class classController {
  static getClassesByInstitute = async (req: Request, res: Response) => {
    const { instituteId } = req.params;
    try {
      const classes = await AppDataSource.getRepository(Class).find({
        where: { institute: { id: parseInt(instituteId) } },
        relations: ["teachers"],
      });
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching classes", error });
    }
  };

  static getTeachersByClass = async (req: Request, res: Response) => {
    const { classId } = req.params;
    try {
      const classEntity = await AppDataSource.getRepository(Class).findOne({
        where: { id: parseInt(classId) },
        relations: ["teachers"],
      });
      res.json(classEntity?.teacher || []);
    } catch (error) {
      res.status(500).json({ message: "Error fetching teachers", error });
    }
  };


    // Get all classes
    // static getAll = async (req: Request, res: Response) => {
    //     const classRepository = AppDataSource.getRepository(Class);
    //     const classes = await classRepository.find();
    //     res.json(classes);
    // };

    static getAll = async (req: Request, res: Response) => {
      const classRepository = AppDataSource.getRepository(Class);
      try {
        const classes = await classRepository.find({ relations: ['teacher', 'institute', 'students', 'assignments'] });
        if (!Array.isArray(classes)) {
          return res.status(500).json({ message: 'Error fetching classes' });
        }
        return res.status(200).json(classes);
      } catch (error) {
        console.error('Error fetching classes:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
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
        const { subject, teacherId, numberOfStudents, grade, startTime, endTime, feePerMonth, scheduleDay,InstituteId} = req.body;
        const classRepository = AppDataSource.getRepository(Class);
        const teacherRepository = AppDataSource.getRepository(Teacher);
        const instituteRepository = AppDataSource.getRepository(Institute);
    
        try {
          // Find the teacher by ID
          const teacher = await teacherRepository.findOne({ where: { teacherId } });

          if(!InstituteId){
            return res.status(404).json({ message: 'Institute is Required' });
          }
          const institute = await instituteRepository.findOne({ where: {  id:InstituteId } });
    
          if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
          }

          
          if(!institute){
            return res.status(404).json({ message: 'Institute not found' });
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
            newClass.institute = institute;
    
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