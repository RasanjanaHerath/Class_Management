import { Request, Response, NextFunction } from 'express';
import { FindOneOptions } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Teacher } from '../entity/Teacher';
import { User } from '../entity/User';
import { Institute } from '../entity/Institute';
import { Student } from '../entity/Student';


export class TeacherController {
  
  // Get teacher details by ID
  static getTeacher = async (req: Request, res: Response, next: NextFunction)=> {
    const teacherRepository = AppDataSource.getRepository(Teacher);
    
    const teacherId = parseInt(req.params.id)
    const teacher = await teacherRepository.findOne({ teacherId });
    

    return teacher
      ? res.json(teacher)
      : res.status(404).json({ message: 'Teacher not found' });
  };

  // Get all users
  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    const teacherRepository = AppDataSource.getRepository(Teacher);
    return teacherRepository.find({ relations: ["user", "student", "institute"] });;
  };


  // Update teacher profile
  static updateTeacher = async (req: Request, res: Response)=> {
    
    const teacherRepository = AppDataSource.getRepository(Teacher);
    //const { id } = req.params.id;
    const teacherId = parseInt(req.params.id)
    const { name, email, description, contact } = req.body;

    const teacher = await teacherRepository.findOneBy({ teacherId });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    teacher.name = name;
    teacher.email = email;
    teacher.description = description;
    teacher.contact = contact;

    await teacherRepository.save(teacher);3

    return res.json(teacher);
  };

  // Create Teacher
  static save = async (request: Request, response: Response, next: NextFunction) => {
    
    const { birthday, nic, phoneNumber, phmId } = request.body;
  
    // Debugging: Check if user is populated
    console.log("User in request:", request.user);
  
    if (request.user?.userRole !== "admin") {
      return response
        .status(403)
        .json({ message: "You are not authorized to create a Teacher" });
    }
  
    const userId = request.user?.userId;
    if (!userId) {
      return response
        .status(400)
        .json({ error: "User ID is missing or invalid" });
    }
  
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await this.userRepository.findOne({id: userId});
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }
  
      const teacher = new Teacher();
      teacher.birthday = birthday;
      teacher.nic = nic;
      teacher.phoneNumber = phoneNumber;
      teacher.user = user;
  
      if (InstituteID) {
        const instituteRepository = AppDataSource.getRepository(Teacher);
        const institute = await this.instituteRepository.findOne({ where: { id: instituteId } });
        if (!institute) {
          return response.status(404).json({ message: "PHM not found" });3
        }
        teacher.institute = institute;
      }
  
      await this.teacherRepository.save(teacher);
      return response.status(201).json(teacher);
    } catch (error) {
      console.error("Error saving teacher:", error);
      return next(new Error("An error occurred while saving the teacher."));
    }
  };
  
  
}
