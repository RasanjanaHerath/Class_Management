// import { Request, Response, NextFunction } from 'express';
// import { FindOneOptions } from 'typeorm';
// import { AppDataSource } from '../data-source';
// import { Teacher } from '../entity/Teacher';
// import { User } from '../entity/User';
// import { Institute } from '../entity/Institute';
// import { Student } from '../entity/Student';


// export class TeacherController {
  
// //   // Get teacher details by ID
//   static getTeacher = async (req: Request, res: Response, next: NextFunction)=> {
//     const teacherRepository = AppDataSource.getRepository(Teacher);
    
//     const teacherId = parseInt(req.params.id)
//     const teacher = await teacherRepository.findOne({ where: { teacherId: teacherId } });
    

//     return teacher
//       ? res.json(teacher)
//       : res.status(404).json({ message: 'Teacher not found' });
//   };

//   // Get all users
//   static getAll = async (req: Request, res: Response, next: NextFunction) => {
//     const teacherRepository = AppDataSource.getRepository(Teacher);
//     return teacherRepository.find({ relations: ["user", "student", "institute"] });;
//   };


// //   // Update teacher profile
//   static updateTeacher = async (req: Request, res: Response)=> {
    
//     const teacherRepository = AppDataSource.getRepository(Teacher);
//     //const { id } = req.params.id;
//     const teacherId = parseInt(req.params.id)
//     const { name, email, description, contact } = req.body;

//     const teacher = await teacherRepository.findOneBy({ teacherId });
//     if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

//     teacher.name = name;
//     teacher.email = email;
//     teacher.description = description;
//     teacher.contact = contact;

//     await teacherRepository.save(teacher);3

//     return res.json(teacher);
//   };

//  // Create Teacher
//   static save = async (request: Request, response: Response, next: NextFunction) => {
    
//     const { birthday, nic, phoneNumber,  } = request.body;
  
//     // Debugging: Check if user is populated
//     console.log("User in request:", request.user);
  
//     if (request.user?.userRole !== "admin") {
//       return response
//         .status(403)
//         .json({ message: "You are not authorized to create a Teacher" });
//     }
  
//     const userId = request.user?.userId;
//     if (!userId) {
//       return response
//         .status(400)
//         .json({ error: "User ID is missing or invalid" });
//     }
  
//     try {
//       const userRepository = AppDataSource.getRepository(User);
//       const user = await userRepository.findOne({id: userId});
//       if (!user) {
//         return response.status(404).json({ message: "User not found" });
//       }
  
//       const teacher = new Teacher();
//       teacher.birthday = birthday;
//       teacher.nic = nic;
//       teacher.phoneNumber = phoneNumber;
//       teacher.user = user;
  
//       if (InstituteID) {
//         const instituteRepository = AppDataSource.getRepository(Teacher);
//         const institute = await this.instituteRepository.findOne({ where: { id: instituteId } });
//         if (!institute) {
//           return response.status(404).json({ message: "PHM not found" });3
//         }
//         teacher.institute = institute;
//       }
  
//       await this.teacherRepository.save(teacher);
//       return response.status(201).json(teacher);
//     } catch (error) {
//       console.error("Error saving teacher:", error);
//       return next(new Error("An error occurred while saving the teacher."));
//     }
//   };
  
  
// }


import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Teacher } from '../entity/Teacher';
import { User } from '../entity/User';
import { Institute } from '../entity/Institute';

export class TeacherController {
  // Get teacher details by ID
  static getTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const teacherRepository = AppDataSource.getRepository(Teacher);

    const teacherId = parseInt(req.params.id, 10);
    try {
      const teacher = await teacherRepository.findOne({
        where: { teacherId },
        relations: ['user', 'institute'], // Ensure necessary relations are loaded
      });

      return teacher
        ? res.json(teacher)
        : res.status(404).json({ message: 'Teacher not found' });
    } catch (error) {
      console.error('Error fetching teacher:', error);
      return res.status(500).json({ message: 'An error occurred while fetching teacher.' });
    }
  };

  // Get all teachers
  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    const teacherRepository = AppDataSource.getRepository(Teacher);

    try {
      const teachers = await teacherRepository.find({ relations: ['user', 'institute'] });
      return res.json(teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      return res.status(500).json({ message: 'An error occurred while fetching teachers.' });
    }
  };

  // Update teacher profile
  static updateTeacher = async (req: Request, res: Response) => {
    const teacherRepository = AppDataSource.getRepository(Teacher);
    const teacherId = parseInt(req.params.id, 10);
    const updateData = req.body; // Expect the necessary fields in the body

    try {
      const teacher = await teacherRepository.findOneBy({ teacherId });
      if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

      Object.assign(teacher, updateData); // Merge new data into existing entity
      await teacherRepository.save(teacher);

      return res.json(teacher);
    } catch (error) {
      console.error('Error updating teacher:', error);
      return res.status(500).json({ message: 'An error occurred while updating the teacher.' });
    }
  };

  // Create Teacher
  static save = async (req: Request, res: Response, next: NextFunction) => {
    const { birthday, nic, phoneNumber, instituteId } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const teacherRepository = AppDataSource.getRepository(Teacher);
      const instituteRepository = AppDataSource.getRepository(Institute);

      // Ensure the user exists
      const user = await userRepository.findOneBy({ id: req.user?.userId });
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Create new teacher entity
      const teacher = new Teacher();
      teacher.birthday = birthday;
      teacher.nic = nic;
      teacher.phoneNumber = phoneNumber;
      teacher.user = user;

      // Associate institute if provided
      if (instituteId) {
        const institute = await instituteRepository.findOneBy({ id: instituteId });
        if (!institute) return res.status(404).json({ message: 'Institute not found' });

        teacher.institute = institute;
      }

      await teacherRepository.save(teacher);
      return res.status(201).json(teacher);
    } catch (error) {
      console.error('Error creating teacher:', error);
      return res.status(500).json({ message: 'An error occurred while saving the teacher.' });
    }
  };
}

