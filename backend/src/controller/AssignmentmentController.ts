import { Request, Response, NextFunction} from 'express';
import { AppDataSource } from '../data-source';
import { Assignment } from '../entity/Assignment';
import multer from 'multer';
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../UploadAssignment'); // Specify the directory to save the uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });

export class AssignmentmentController {

    // Get all teachers
    static getAll = async(req: Request, res: Response, next: NextFunction) => {

        const assignmentmentRepository = AppDataSource.getRepository(Assignment);
        try {
        return assignmentmentRepository.find({ where: { deletedAt: null } });
        } catch (error) {
        console.error('Error fetching announcements:', error);
        return res.status(500).json({ message: 'An error occurred while fetching announcements.' });
        }
    };

    // Get teacher details by ID
    static getAssignmentById = async(req: Request, res: Response) =>{
        const assignmentmentRepository = AppDataSource.getRepository(Assignment);

        try {
            const id = parseInt(req.params.id);
            const assignment = await assignmentmentRepository.findOne({ where: { id, deletedAt: null } });
            if (!assignment) {
                return res.status(404).json({ message: 'Announcement not found' });
            }
            return res.status(200).json(assignment);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Create a new assignment
    static createAssignment = [
        upload.single('file'), // Middleware to handle file upload
        async (req: Request, res: Response) => {
          const assignmentmentRepository = AppDataSource.getRepository(Assignment);
          try {
            const { title, dueDate, description, totalMarks, assignmentFilePath } = req.body;
            const file = req.file;
    
            const assignment = Object.assign(new Assignment(), {
              title,
              dueDate,
              description,
              totalMarks,
              assignmentFilePath: file ? file.path : null, // Save the file path if a file is uploaded
            });
    
            await assignmentmentRepository.save(assignment);
            return res.status(201).json(assignment);
          } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
          }
        },
      ];

    // public async createAssignment(req: Request, res: Response) {
    //     try {
    //         const { title, dueDate, description } = req.body;
    //         const assignment = Object.assign(new Assignment(), {
    //             title,
    //             dueDate,
    //             description,
    //         });

    //         return this.assignmentmentRepository.save(assignment);
    //     } catch (error) {
    //         return res.status(500).json({ message: 'Internal Server Error' });
    //     }
    // }


//     public async updateAnnouncement(req: Request, res: Response): Promise<Response> {
//         try {
//             const id = req.params.id;
//             const announcementData = req.body;
//             const updatedAnnouncement = await this.announcementService.updateAnnouncement(id, announcementData);
//             if (!updatedAnnouncement) {
//                 return res.status(404).json({ message: 'Announcement not found' });
//             }
//             return res.status(200).json(updatedAnnouncement);
//         } catch (error) {
//             return res.status(500).json({ message: 'Internal Server Error' });
//         }
//     }

//     public async deleteAnnouncement(req: Request, res: Response): Promise<Response> {
//         try {
//             const id = req.params.id;
//             const deleted = await this.announcementService.deleteAnnouncement(id);
//             if (!deleted) {
//                 return res.status(404).json({ message: 'Announcement not found' });
//             }
//             return res.status(200).json({ message: 'Announcement deleted successfully' });
//         } catch (error) {
//             return res.status(500).json({ message: 'Internal Server Error' });
//         }
//     }
}