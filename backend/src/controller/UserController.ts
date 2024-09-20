// src/controllers/UserController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserController {
    // Get all users
    static getAll = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.json(users);
    };

    // Create a new user
    static createUser = async (req: Request, res: Response) => {
        const { firstName, lastName, age } = req.body;
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;

        const userRepository = AppDataSource.getRepository(User);
        await userRepository.save(user);
        res.json({ message: "User created", user });
    };

    
}
