import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Teacher } from '../entity/Teacher';

export class TeacherController {
  // Get teacher details by ID
  static getTeacher = async (req: Request, res: Response) {
    const teacherRepo = AppDataSource.getRepository(Teacher);
    const { id } = req.params;
    const teacher = await teacherRepo.findOneBy({ id });

    return teacher
      ? res.json(teacher)
      : res.status(404).json({ message: 'Teacher not found' });
  };

  // Get all users
  static getAll = async (req: Request, res: Response) => {
    const teacherRepository = AppDataSource.getRepository(Teacher);
    const teacher = await teacherRepository.find();
    res.json(teacher);
  };


  // Update teacher profile
  static updateTeacher = async (req: Request, res: Response) {
    const teacherRepo = AppDataSource.getRepository(Teacher);
    const { id } = req.params;
    const { name, email, description, contact } = req.body;

    const teacher = await teacherRepo.findOneBy({ id });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    teacher.name = name;
    teacher.email = email;
    teacher.description = description;
    teacher.contact = contact;

    await teacherRepo.save(teacher);
    return res.json(teacher);
  };
}
