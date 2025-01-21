// src/controllers/UserController.ts
import { NextFunction, Request, Response } from "express";
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

        // validattions
        
        if (!firstName) {
            return res.status(400).json({ message: "First name is required" });
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!userName) {
            console.log('Username is required:', userName); // Log the username
            return res.status(400).json({ message: "Username is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        //user with email already exists
        const userExists = await userRepository.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // check username
        const userNameExists = await userRepository.findOne({ where: { userName } });
        if (userNameExists) {
            return res.status(400).json({ message: "Username already exists" });
        }



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
            console.log('User role from user reg:', user.role); // Log the user role
            const token = jwt.sign(
                { userId: user.id, userRole: user.role },
                process.env.JWT_SECRET! || 'default_secret'
            );
            console.log('Generated token:', token); // Log the generated token
            res.status(201).json({ message: "User registered successfully", token });
        } catch (error) {
            console.error('Error registering user:', error); // Log the error
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
            const user = await userRepository.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            
            // Check if password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Generate JWT
            const token = jwt.sign(
                { userId: user.id , userRole: user.role},
                 process.env.JWT_SECRET || 'default_secret');
            const userResponse = {
                id: user.id,
                email: user.email,
                firstName: user.firstName, 
                lastName: user.lastName,
                userName: user.userName,
                role: user.role
            };
            res.json({ user: userResponse, token });
        } catch (error) {
            console.error("Error during login:", error); // Log the error for debugging
            res.status(500).json({ message: "Error logging in", error: error.toString() });
        }
    };

    
}
