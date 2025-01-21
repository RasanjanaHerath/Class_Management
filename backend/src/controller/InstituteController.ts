// src/controllers/UserController.ts
import { Request, Response, NextFunction, response } from "express";
import { AppDataSource } from "../data-source";
import { Institute } from "../entity/Institute";
import { User } from "../entity/User";
import { Class } from "../entity/Class";
import { Teacher } from "../entity/Teacher";




export class InstituteController {

  static getInstitutes = async (req: Request, res: Response) => {
    try {
      const instituteRepository = AppDataSource.getRepository(Institute);
      const institutes = await instituteRepository.find({relations: ["user"], // Ensure user relation is loaded
      });

      const result = institutes.map((institute) => ({
        id: institute.id,
        name: institute.user.firstName, // Use user's first name for dropdown
        city: institute.city,
        phoneNumber: institute.phoneNumber,
      }));

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching institutes:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  private instituteRepositary = AppDataSource.getRepository(Institute); 

 

  static getInstitutesByCity = async (req: Request, res: Response) => {
    const { city } = req.params;
    try {
      const institutes = await AppDataSource.getRepository(Institute).find({
        where: { city },
      });
      res.json(institutes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching institutes", error });
    }
  };

  static async getClassesByInstitute(req: Request, res: Response) {
    const { instituteId } = req.params;
    try {
      const classes = await AppDataSource
        .getRepository(Class)
        .find({ where: { institute: { id: parseInt(instituteId) } } });
      res.status(200).json(classes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching classes', error });
    }
  }

  static async getTeachersByClass(req: Request, res: Response) {
    const { classId } = req.params;
    try {
      const teachers = await AppDataSource
        .getRepository(Teacher)
        .createQueryBuilder('teacher')
        .leftJoinAndSelect('teacher.classes', 'class')
        .where('class.id = :classId', { classId: parseInt(classId) })
        .getMany();

      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching teachers', error });
    }
  }
 
   // Get all Institute
   static getAll = async (req: Request, res: Response, next: NextFunction) => {
    const instituteRepository = AppDataSource.getRepository(Institute);

    try {
      const institutes = await instituteRepository.find({ relations: ['user'] });
      return res.json(institutes);
    } catch (error) {
      console.error('Error fetching institutes:', error);
      return res.status(500).json({ message: 'An error occurred while fetching institutes.' });
    }
};



    // Create a new Institute
    static createInstitute = async (req: Request, res: Response, next: NextFunction) => {
      const { phoneNumber, city } = req.body;
  
      if (req.user.userRole !== "institute") {
          console.log("role from controller new :", req.user.userRole);
          return res.status(403).json({ message: "You are not authorized to create Institute" });
      }
  
      const userId = req.user?.userId;
  
      if (!userId) {
          return res.status(403).json({ message: "You are not authorized to create Institute" });
      }
  
      try {
          const instituteRepository = AppDataSource.getRepository(Institute);
          const userRepository = AppDataSource.getRepository(User);
  
          // Find the user by userId without loading the institute relation
          const user = await userRepository.findOne({ where: { id: userId } });
          if (!user) return res.status(404).json({ message: "User not found" });
  
          const institute = new Institute();
          institute.city = city;
          institute.phoneNumber = phoneNumber;
          institute.user = user; // Set the user to the institute
          institute.name=user.firstName;
  
          await instituteRepository.save(institute);
  
          return res.status(201).json(institute);
      } catch (error) {
          console.error("Error creating Institute:", error);
          return res.status(500).json({ message: "An error occurred while saving the Institute." });
      }
  };
  

    // Update a user
//     static updateInstitute = async (req: Request, res: Response) => {
//         const { name, email, city , phoneNumber} = req.body;
//         const instituteRepository = AppDataSource.getRepository(Institute);

//         const institute = await instituteRepository.findOneBy({ id: parseInt(req.params.id) });
//         if (institute) {
//         // institute.name = name;
//         // institute.email = email;
//         institute.city = city;
//         institute.city = city;


//         await instituteRepository.save(institute);
//         res.json({ message: "Institute updated", institute });
//         } else {
//         res.json({ message: "Institute not found" });
//         }
//     };

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

    static updateInstitute = async (req: Request, res: Response, next: NextFunction) => {
      const instituteRepository = AppDataSource.getRepository(Institute);
      //const instituteId = parseInt(req.params.id, 10);
      //const updateData = req.body; // Expect the necessary fields in the body

      // try {
      //     // Find the teacher by ID
      //     const teacher = await teacherRepository.findOneBy({ teacherId });
      //     if (!teacher) {
      //         return res.status(404).json({ message: 'Teacher not found' });
      //     }

      //     // Update teacher details
      //     Object.assign(teacher, updateData); // Merge new data into existing entity
      //     await teacherRepository.save(teacher);

      //     return res.status(200).json({ message: 'Teacher updated successfully', teacher });
      // } catch (error) {
      //     console.error('Error updating teacher:', error);
      //     return res.status(500).json({ message: 'An error occurred while updating the teacher.', error });
      // }

      const id = parseInt(req.params.id);
      const { firstName, lastName, email, phoneNumber, city } =
        req.body;

      const userId = req.user?.userId;

      try {
        const institute = await instituteRepository.findOne({
          where: { id },
          relations: ["user"],
        });

        if (!institute) {
          return res.status(404).json({ message: "Institute not found" });
        }

        // Update the moh's details
        institute.user.firstName = firstName ?? institute.user.firstName;
        institute.user.lastName = lastName ?? institute.user.lastName;
        institute.user.email = email ?? institute.user.email;
        institute.phoneNumber = phoneNumber ?? institute.phoneNumber;
        institute.city = city ?? institute.city;
      
        await instituteRepository.save(institute);
        res.send(institute);
        return;
      } catch (error) {
        return next(error);
      }
    };

    static async getCities(req: Request, res: Response) {
      try {
        const cities = await AppDataSource
          .getRepository(Institute)
          .createQueryBuilder('institute')
          .select('institute.city', 'city')
          .distinct(true)
          .getRawMany();
  
        res.status(200).json(cities.map((row) => row.city));
      } catch (error) {
        res.status(500).json({ message: 'Error fetching cities', error });
      }
    }

    

    
}