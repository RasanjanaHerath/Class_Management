import { Request, Response } from 'express';
import { AnnouncementService } from '../services/AnnouncementService';

export class AnnouncementController {
    private announcementService: AnnouncementService;

    constructor() {
        this.announcementService = new AnnouncementService();
    }

    public async getAllAnnouncements(req: Request, res: Response): Promise<Response> {
        try {
            const announcements = await this.announcementService.getAllAnnouncements();
            return res.status(200).json(announcements);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async getAnnouncementById(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            const announcement = await this.announcementService.getAnnouncementById(id);
            if (!announcement) {
                return res.status(404).json({ message: 'Announcement not found' });
            }
            return res.status(200).json(announcement);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async createAnnouncement(req: Request, res: Response): Promise<Response> {
        try {
            const announcementData = req.body;
            const newAnnouncement = await this.announcementService.createAnnouncement(announcementData);
            return res.status(201).json(newAnnouncement);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async updateAnnouncement(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            const announcementData = req.body;
            const updatedAnnouncement = await this.announcementService.updateAnnouncement(id, announcementData);
            if (!updatedAnnouncement) {
                return res.status(404).json({ message: 'Announcement not found' });
            }
            return res.status(200).json(updatedAnnouncement);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async deleteAnnouncement(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            const deleted = await this.announcementService.deleteAnnouncement(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Announcement not found' });
            }
            return res.status(200).json({ message: 'Announcement deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}