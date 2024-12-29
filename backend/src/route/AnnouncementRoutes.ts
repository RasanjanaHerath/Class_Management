import express from 'express';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/AnnouncementController';

const router = express.Router();

// Route to get all announcements
router.get('/', getAnnouncements);

// Route to create a new announcement
router.post('/', createAnnouncement);

// Route to update an existing announcement
router.put('/:id', updateAnnouncement);

// Route to delete an announcement
router.delete('/:id', deleteAnnouncement);

export default router;