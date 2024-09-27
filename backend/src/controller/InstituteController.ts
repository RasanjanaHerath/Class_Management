// src/controllers/UserController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Institute } from "../entity/Institute";

export class InstituteController {
    // Get all users
    static getAll = async (req: Request, res: Response) => {
        const instituteRepository = AppDataSource.getRepository(Institute);
        const institute = await instituteRepository.find();
        res.json(institute);
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
