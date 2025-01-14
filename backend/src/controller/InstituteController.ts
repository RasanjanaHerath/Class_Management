// src/controllers/UserController.ts
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Institute } from "../entity/Institute";
import { Teacher } from '../entity/Teacher';
import { User } from '../entity/User';

export class InstituteController {
    // Get all users
    // static getAll = async (req: Request, res: Response) => {
    //     const instituteRepository = AppDataSource.getRepository(Institute);
    //     const institute = await instituteRepository.find();
    //     res.json(institute);
    // };

    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        const instituteRepository = AppDataSource.getRepository(Teacher);
    
        try {
          const institutes = await instituteRepository.find({ relations: ['user'] });
          return res.json(institutes);
        } catch (error) {
          console.error('Error fetching teachers:', error);
          return res.status(500).json({ message: 'An error occurred while fetching teachers.' });
        }
    };

    // Create a new user
    static createInstitute = async (req: Request, res: Response) => {
        const { name, email, city } = req.body;
        const institute = new Institute();
        institute.name = name;
        institute.email = email;
        institute.city = city;

        const instituteRepository = AppDataSource.getRepository(Institute);
        await instituteRepository.save(institute);
        res.json({ message: "Institute created", institute });
    };

    static save = async (req: Request, res: Response, next: NextFunction) => {
        const { city , phoneNumber} = req.body;
    
        if (req.user.userRole !== "institute") {
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
          const institute = new Institute();
          institute.city = city;
          institute.phoneNumber = phoneNumber;
          institute.user = user;

          // Associate institute if provided
          // if (instituteId) {
          //   const institute = await instituteRepository.findOneBy({ id: instituteId });
          //   if (!institute) return res.status(404).json({ message: 'Institute not found' });
    
          //   teacher.institute = institute;
          // }
    
          await instituteRepository.save(institute);
          return res.status(201).json(institute);
        } catch (error) {
          console.error('Error creating teacher:', error);
          return res.status(500).json({ message: 'An error occurred while saving the teacher.' });
        }
    
      };

    // Update a user
    static updateInstitute = async (req: Request, res: Response) => {
        const { name, email, city } = req.body;
        const instituteRepository = AppDataSource.getRepository(Institute);

        const institute = await instituteRepository.findOneBy({ id: parseInt(req.params.id) });
        if (institute) {
        institute.name = name;
        institute.email = email;
        institute.city = city;


        await instituteRepository.save(institute);
        res.json({ message: "Institute updated", institute });
        } else {
        res.json({ message: "Institute not found" });
        }
    };

    // Delete a user
    static deleteInstitute = async (req: Request, res: Response) => {
        const instituteRepository = AppDataSource.getRepository(Institute);

        const institute = await instituteRepository.findOneBy({ id: parseInt(req.params.id) });
        if (institute) {
        await instituteRepository.remove(institute);
        res.json({ message: "Institute deleted" });
        } else {
        res.json({ message: "Institute not found" });
       }
    };


    

    
}
