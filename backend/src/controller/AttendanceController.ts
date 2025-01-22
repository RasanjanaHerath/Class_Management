
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Attendance } from "../entity/Attendance";


export class AttendanceController {
    // Get all 
    static getAll = async (req: Request, res: Response) => {
        const attendanceRepository = AppDataSource.getRepository(Attendance);
        try {
            const attendances = await attendanceRepository.find({ relations: [ 'institute'] });
            if (!Array.isArray(attendances)) {
              return res.status(500).json({ message: 'Error fetching Attendance' });
            }
            return res.status(200).json(attendances);
          } catch (error) {
            console.error('Error fetching Attendave:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
    };

    // Create a new 
    static createAttendance = async (req: Request, res: Response) => {
        const { classID,date,isPresent } = req.body;
        const attendance = new Attendance();

        attendance.classID = classID;
        attendance.date = date;
        attendance.isPresent = isPresent;
    

        const attendanceRepository = AppDataSource.getRepository(Attendance);
        await attendanceRepository.save(attendance);
        res.json({ message: "Attendace sheet created", attendance });
    };

    // Update

    static updateAttendance = async (req: Request, res: Response) => {
        const {classID,date,isPresent} = req.body;
        const attendanceRepository = AppDataSource.getRepository(Attendance);

        const attendance = await attendanceRepository.findOneBy({ id: parseInt(req.params.id) });
        if (attendance) {
        attendance.classID = classID;
        attendance.date = date;
        attendance.isPresent = isPresent;
        

        await attendanceRepository.save(attendance);
        res.json({ alert : "Attendace sheet updated", attendance });
        } else {
        res.json({ alert : "User not found" });
        }
    };

    // Delete a Notice
    static deleteAttendance = async (req: Request, res: Response) => {
        const attendanceRepository = AppDataSource.getRepository(Attendance);

        const attendance = await attendanceRepository.findOneBy({ id: parseInt(req.params.id) });
        if (attendance) {
        await attendanceRepository.remove(attendance);
        res.json({ alert : "Attendance Sheet deleted" });
        } else {
        res.json({ alert : "Attendance sheet Not found" });
        }
    };
}
