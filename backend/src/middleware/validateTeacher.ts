// src/middleware/validateTeacher.ts
import { Request, Response, NextFunction } from 'express';

export const validateTeacher = (req: Request, res: Response, next: NextFunction) => {
    const { name, qualifications, subjects } = req.body;
    if (!name || !qualifications || !subjects) {
        return res.status(400).json({ message: 'Missing required fields: name, qualifications, or subjects.' });
    }
    next();
};
