import { Announcement } from '../models/Announcement';
import { Database } from '../database/Database';

export class AnnouncementService {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    async createAnnouncement(title: string, content: string, authorId: string): Promise<Announcement> {
        const announcement = new Announcement(title, content, authorId);
        await this.db.saveAnnouncement(announcement);
        return announcement;
    }

    async getAnnouncements(): Promise<Announcement[]> {
        return await this.db.getAnnouncements();
    }

    async getAnnouncementById(id: string): Promise<Announcement | null> {
        return await this.db.getAnnouncementById(id);
    }

    async updateAnnouncement(id: string, title: string, content: string): Promise<Announcement | null> {
        const announcement = await this.db.getAnnouncementById(id);
        if (!announcement) {
            return null;
        }
        announcement.title = title;
        announcement.content = content;
        await this.db.saveAnnouncement(announcement);
        return announcement;
    }

    async deleteAnnouncement(id: string): Promise<boolean> {
        return await this.db.deleteAnnouncement(id);
    }
}