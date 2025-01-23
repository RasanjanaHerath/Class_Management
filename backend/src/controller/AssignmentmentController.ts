import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Assignment } from '../entity/Assignment';
import { User } from '../entity/User';
import { Institute } from '../entity/Institute';
import { Teacher } from '../entity/Teacher';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Class } from '../entity/Class';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath =  path.join(__dirname, '../../UploadAssignment'); // Specify the directory to save the uploaded files
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export class AssignmentController {
  // Get all assignments
  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    const assignmentRepository = AppDataSource.getRepository(Assignment);
    try {
      const assignments = await assignmentRepository.find({ where: { deletedAt: null },relations:{
        institute: true,
        teacher: true,
        classes: true
      } });
      return res.status(200).json(assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Get a single assignment by ID
  static getById = async (req: Request, res: Response, next: NextFunction) => {
    const assignmentRepository = AppDataSource.getRepository(Assignment);
    try {
      const id = parseInt(req.params.id);
      const assignment = await assignmentRepository.findOne({ where: { id, deletedAt: null } });
      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      return res.status(200).json(assignment);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

    // Get assignments by teacher and institute
    static getAssignmentsByTeacherAndInstitute = async (req: Request, res: Response) => {
      const assignmentRepository = AppDataSource.getRepository(Assignment);
      const teacherRepository = AppDataSource.getRepository(Teacher);
      const instituteRepository = AppDataSource.getRepository(Institute);
  
      try {
        const { instituteId } = req.query;
        const userId = req.user?.userId;
  
        if (!userId) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        const teacher = await teacherRepository.findOne({ where: { user: { id: userId } } });
  
        if (!teacher) {
          return res.status(404).json({ message: 'Teacher not found' });
        }
  
        const institute = await instituteRepository.findOne({ where: { id: parseInt(instituteId as string) } });
  
        if (!institute) {
          return res.status(404).json({ message: 'Institute not found' });
        }
  
        const assignments = await assignmentRepository.find({
          where: { teacher: { teacherId: teacher.teacherId }, institute: { id: institute.id }, deletedAt: null },
        });
  
        return res.status(200).json(assignments);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    };

  // Create a new assignment
  static createAssignment = [
    upload.single('file'), // Middleware to handle file upload
    async (req: Request, res: Response) => {
      const assignmentRepository = AppDataSource.getRepository(Assignment);
      
      try {
        const { title, dueDate, description, instituteId, classId } = req.body;
        const file = req.file;
        if(!instituteId){
          return res.status(404).json({ message: 'Institute is Required' });
        }

        const instituteRepository = AppDataSource.getRepository(Institute);
        const classRepository = AppDataSource.getRepository(Class);

        const institute = await instituteRepository.findOne({ where: { id: instituteId } });
        const classz = await classRepository.findOne({ where: { id: classId } });
        const teacherRepository = AppDataSource.getRepository(Teacher);
        const userRepository = AppDataSource.getRepository(User);
        
        const userId = req.user?.userId;

        if(!userId){
          return res.status(404).json({ message: 'User not found' });
        }

        const user = await userRepository.findOne({
          where: { id: userId },
        });

        const teacher = await teacherRepository.findOne({
          where: { user },
          relations: ["user"],
        });

        if (!institute) {
          return res.status(404).json({ message: 'Institute not found' });
        }
  
        if (!teacher) {
          return res.status(404).json({ message: 'Teacher not found' });
        }       

        if (!classz) {
          return res.status(404).json({ message: 'Class not found' });
        }   

        const assignment = Object.assign(new Assignment(), {
          title,
          institute,
          teacher,
          classes: classz,
          dueDate,
          description,
          assignmentFilePath: file ? file.path : null, // Save the file path if a file is uploaded
        });

        await assignmentRepository.save(assignment);
        return res.status(201).json(assignment);
      } catch (error) {
        console.error('Error creating assignment:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  ];

  // Update an assignment
  static updateAssignment = [
    upload.single('file'), // Middleware to handle file upload
    async (req: Request, res: Response) => {
      const assignmentRepository = AppDataSource.getRepository(Assignment);
      try {
        const id = parseInt(req.params.id);
        const { title, dueDate, description, totalMarks } = req.body;
        const file = req.file;

        const assignment = await assignmentRepository.findOne({ where: { id, deletedAt: null } });
        if (!assignment) {
          return res.status(404).json({ message: 'Assignment not found' });
        }

        assignment.title = title;
        assignment.dueDate = dueDate;
        assignment.description = description;
        if (file) {
          assignment.assignmentFilePath = file.path; // Update the file path if a new file is uploaded
        }

        await assignmentRepository.save(assignment);
        return res.status(200).json(assignment);
      } catch (error) {
        console.error('Error updating assignment:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  ];

  // Delete an assignment
  static deleteAssignment = async (req: Request, res: Response) => {
    const assignmentRepository = AppDataSource.getRepository(Assignment);
    try {
      const id = parseInt(req.params.id);
      const assignment = await assignmentRepository.findOne({ where: { id, deletedAt: null } });
      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }

      assignment.deletedAt = new Date();
      await assignmentRepository.save(assignment);
      return res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (error) {
      console.error('Error deleting assignment:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}