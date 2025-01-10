import { Request, Response, NextFunction} from 'express';
import { AppDataSource } from '../data-source';
import { Assignment } from '../entity/Assignment';

export class AssignmentmentController {
    private assignmentmentRepository = AppDataSource.getRepository(Assignment);

    // Get all teachers
    async getAll(req: Request, res: Response, next: NextFunction){

        try {
        return this.assignmentmentRepository.find({ where: { deletedAt: null } });
        } catch (error) {
        console.error('Error fetching announcements:', error);
        return res.status(500).json({ message: 'An error occurred while fetching announcements.' });
        }
    };

    // Get teacher details by ID
    public async getAnnouncementById(req: Request, res: Response){
        try {
            const id = parseInt(req.params.id);
            const assignment = await this.assignmentmentRepository.findOne({ where: { id, deletedAt: null } });
            if (!assignment) {
                return res.status(404).json({ message: 'Announcement not found' });
            }
            return res.status(200).json(assignment);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async createAssignment(req: Request, res: Response) {
        try {
            const { title, subtitle, message } = req.body;
            const assignment = Object.assign(new Assignment(), {
                title,
                subtitle,
                message,
            });

            return this.assignmentmentRepository.save(assignment);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }


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