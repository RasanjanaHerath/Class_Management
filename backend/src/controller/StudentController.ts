
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";
import { User } from "../entity/User";


export class StudentController {
    // Get all Students
    static getAll = async (req: Request, res: Response) => {
      console.log("here console")

        const studentRepository = AppDataSource.getRepository(Student);
        const Students = await studentRepository.find();
        res.json(Students);
    };


    // Create Student
  static save = async (req: Request, res: Response, next: NextFunction) => {
    const { school,birthday,age,address,nic,telephone,parents_name,parents_number,classes } = req.body;

    if (req.user.userRole !== "student") {
      console.log("role from controller :", req.user.userRole);
    
      return res
        .status(403)
        .json({ message: "You are not authorized to create a Student" });
    }

    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is missing or invalid" });
    }


    try {
      const userRepository = AppDataSource.getRepository(User);
      const studentRepository = AppDataSource.getRepository(Student);

      // Ensure the user exists
      const user = await userRepository.findOneBy({ id: req.user?.userId });
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Create new student entity
      const student = new Student();
     
      student.school = school;
      student.birthday = birthday;
      student.age = age;
      student.nic = nic;
      student.address = address;
      student.telephone = telephone;
      student.parents_name = parents_name;
      student.parents_number = parents_number;
      // student.institute = institute;
      // student.teacher = teacher;
      // student.notices = notices;
      student.user = user
      student.classes = classes;
      

      // Associate institute if provided
      // if (instituteId) {
      //   const institute = await instituteRepository.findOneBy({ id: instituteId });
      //   if (!institute) return res.status(404).json({ message: 'Institute not found' });

      //   teacher.institute = institute;
      // }

      await studentRepository.save(student);
      return res.status(201).json(student);
    } catch (error) {
      console.error('Error creating Student:', error);
      return res.status(500).json({ message: 'An error occurred while saving the student.' });
    }

  };



}
