// src/controllers/UserController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";


export class UserController {

    // Get all users
    static getAll = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.json(users);

    };

    // Get a single user by ID
    static getById = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
        res.json(user || { message: "User not found" });
    };

    // Create a new user
    static createUser = async (req: Request, res: Response) => {
        const { firstName, lastName, email, userName, role , password} = req.body;
        const userRepository = AppDataSource.getRepository(User);

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User();
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.userName = userName;
            user.role = role;
            user.password = hashedPassword;

            await userRepository.save(user);
            const token = jwt.sign(
                { userId: user.id, userRole: user.role},
               "dafojaldkfajd",
            );
            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error registering user", error });
        }
    };

    // Update a user
    static updateUser = async (req: Request, res: Response) => {
        const { firstName, lastName, email, userName, role , password} = req.body;
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.userName = userName;
        user.role = role;

        // If a password is provided, hash it
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await userRepository.save(user);
        res.json({ message: "User updated", user });
        } else {
        res.json({ message: "User not found" });
        }
    };

    // Delete a user
    static deleteUser = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (user) {
        await userRepository.remove(user);
        res.json({ message: "User deleted" });
        } else {
        res.json({ message: "User not found" });
        }
    };

    // Login function
    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);

        try {
            // Find the user by first name
            const user = await userRepository.findOne({ where:{email} });
            //console.log("User found:", user);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            
            // Check if password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: "Invalid credentials" });
                return;
            }
            //console.log("eafdafdasfd0",process.env.JWT_SECRET)
            // Generate JWT
            const token = jwt.sign({ userId: user.id }," process.env.JWT_SECRET ");
            const userResponse = {
                id:user.id,
                email:user.email,
                firstName:user.firstName, 
                lastName:user.lastName,
                userName:user.userName,
                role:user.role
            };
            //res.json({user:userResponse, token})  
            res.status(200).json({user:userResponse, token, message: "Login successful" }); 
        } catch (error) {
            console.error("Error during login:", error); // Log the error for debugging
            res.status(500).json({ message: "Error logging in", error: error.toString() });
        }
    };

    
}
