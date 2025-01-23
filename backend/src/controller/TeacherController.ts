import { Request, Response, NextFunction} from 'express';
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
      const teachers = await teacherRepository.find({ relations: ['user'] });
      return res.json(teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      return res.status(500).json({ message: 'An error occurred while fetching teachers.' });
    }
  };


  // Update teacher profile
  static updateTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const teacherRepository = AppDataSource.getRepository(Teacher);
    const teacherId = parseInt(req.params.id, 10);
    const updateData = req.body; // Expect the necessary fields in the body

    // try {
    //     // Find the teacher by ID
    //     const teacher = await teacherRepository.findOneBy({ teacherId });
    //     if (!teacher) {
    //         return res.status(404).json({ message: 'Teacher not found' });
    //     }

    //     // Update teacher details
    //     Object.assign(teacher, updateData); // Merge new data into existing entity
    //     await teacherRepository.save(teacher);

    //     return res.status(200).json({ message: 'Teacher updated successfully', teacher });
    // } catch (error) {
    //     console.error('Error updating teacher:', error);
    //     return res.status(500).json({ message: 'An error occurred while updating the teacher.', error });
    // }

    const id = parseInt(req.params.id);
    const { firstName, lastName, email, phoneNumber, qualification, description, experience } =
      req.body;

    const userId = req.user?.userId;

    try {
      const teacher = await teacherRepository.findOne({
        where: { teacherId },
        relations: ["user"],
      });

      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      // Update the teacher's details
      teacher.user.firstName = firstName ?? teacher.user.firstName;
      teacher.user.lastName = lastName ?? teacher.user.lastName;
      teacher.user.email = email ?? teacher.user.email;
      teacher.phoneNumber = phoneNumber ?? teacher.phoneNumber;
      teacher.qualification = qualification ?? teacher.qualification;
      teacher.description = description ?? teacher.description;
      teacher.experience = experience ?? teacher.experience;
      teacher.teacherId = teacherId ?? teacher.teacherId;

      await teacherRepository.save(teacher);
      res.send(teacher);
      return;
    } catch (error) {
      return next(error);
    }
  };


  // Create Teacher
  static save = async (req: Request, res: Response, next: NextFunction) => {
    const { birthday, nic, phoneNumber, qualification, description, experience, subjects } = req.body;

    if (req.user.userRole !== "teacher") {
      console.log("role from controller :", req.user.userRole);
      // return "You are not authorized to create a MOH";
      return res
        .status(403)
        .json({ message: "You are not authorized to create a TEacher" });
    }

    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is missing or invalid" });
    }


    try {
      const userRepository = AppDataSource.getRepository(User);
      const teacherRepository = AppDataSource.getRepository(Teacher);
      const instituteRepository = AppDataSource.getRepository(Institute);

      // Ensure the user exists
      const user = await userRepository.findOneBy({ id: req.user?.userId });
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Create new teacher entity
      const teacher = new Teacher();
      teacher.name = user.firstName;
      teacher.birthday = birthday;
      teacher.nic = nic;
      teacher.phoneNumber = phoneNumber;
      teacher.qualification = qualification;
      teacher.description = description;
      teacher.subjects = subjects;
      teacher.experience = experience;
      teacher.user = user;

      // Associate institute if provided
      // if (instituteId) {
      //   const institute = await instituteRepository.findOneBy({ id: instituteId });
      //   if (!institute) return res.status(404).json({ message: 'Institute not found' });

      //   teacher.institute = institute;
      // }

      await teacherRepository.save(teacher);
      return res.status(201).json(teacher);
    } catch (error) {
      console.error('Error creating teacher:', error);
      return res.status(500).json({ message: 'An error occurred while saving the teacher.' });
    }

  };

  // Delete teacher by ID
  // static deleteTeacher = async (req: Request, res: Response) => {
  //   const teacherRepository = AppDataSource.getRepository(Teacher);
  //   const teacherId = parseInt(req.params.id, 10);

  //   try {
  //     const teacher = await teacherRepository.findOne({ where: { teacherId: teacherId } });
  //     if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

  //     await teacherRepository.remove(teacher);
  //     return res.status(204).send();
  //   } catch (error) {
  //     console.error('Error deleting teacher:', error);
  //     return res.status(500).json({ message: 'An error occurred while deleting the teacher.' });
  //   }
  // };
  static deleteTeacher = async (req: Request, res: Response) => {
    const teacherRepository = AppDataSource.getRepository(Teacher);
    const teacherId = parseInt(req.params.id, 10);

    try {
      const teacher = await teacherRepository.findOne({ where: { teacherId: teacherId } });
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      await teacherRepository.remove(teacher);
      return res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
      console.error('Error deleting teacher:', error);
      return res.status(500).json({ message: 'An error occurred while deleting the teacher.' });
    }
  };

}



