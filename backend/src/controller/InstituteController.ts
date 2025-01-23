// src/controllers/UserController.ts
import { Request, Response, NextFunction, response } from "express";
import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Institute } from "../entity/Institute";
import { User } from "../entity/User";
import { Class } from "../entity/Class";
import { Teacher } from "../entity/Teacher";
import { Student } from "../entity/Student";
import { isDataView } from "util/types";
import { ClassCard } from "../entity/ClassCard";




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

  static async getClassesByUserId(req: Request, res: Response) {
    const { userId } = req.params;
  
    // Validate userId
    if (!userId || isNaN(Number(userId))) {
      return res.status(400).json({ message: 'Invalid userId parameter' });
    }
  
    try {
      // Fetch classes based on the institute's userId
      const classes = await AppDataSource.getRepository(Class).find({
        where: {
          institute: {
            user: { id: parseInt(userId) }, // Assuming `institute.user` relates to the `userId`
          },
        },
        relations: ['teacher', 'institute', 'institute.user', 'students', 'assignments'], // Include all necessary relations
      });
      
  
      if (classes.length === 0) {
        return res.status(404).json({ message: 'No classes found for the given institute userId' });
      }
  
      // Return the fetched classes
      res.status(200).json(classes);
    } catch (error) {
      console.error('Error fetching classes:', error);
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

    //get institute by teacher
    static getInstitutesByTeacher = async (req: Request, res: Response, next: NextFunction) => {
      const instituteRepository = AppDataSource.getRepository(Institute);
      const teacherRepository = AppDataSource.getRepository(Teacher);
      const classRepository = AppDataSource.getRepository(Class);
  
      try {

      // Fetch the teacherId using the userId
      const teacher = await teacherRepository.findOne({ where: { user: { id: req.user.userId } } });

      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      // Fetch classes taught by the teacher
      const classes = await classRepository.find({
        where: { teacher: { teacherId: teacher.teacherId } },
        relations: ['institute'],
      });

      // Extract unique institutes from the classes
      const institutes = classes.map((classItem) => classItem.institute);
      const uniqueInstitutes = Array.from(new Set(institutes.map((institute) => institute.id)))
        .map((id) => institutes.find((institute) => institute.id === id));
  
        return res.json(uniqueInstitutes);
      } catch (error) {
        console.error('Error fetching institutes by teacher:', error);
        return res.status(500).json({ message: 'An error occurred while fetching institutes by teacher.' });
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

  static createInstituteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, city,userId } = req.body;
    console.log(req.body)

    if (req.user.userRole !== "admin") {
        console.log("role from controller :", req.user.userRole);
        return res.status(403).json({ message: "You are not authorized to create Institute" });
    }

    

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
        institute.isverified =true;

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
//     static deleteInstitute = async (req: Request, res: Response) => {
//         const instituteRepository = AppDataSource.getRepository(Institute);

//         const institute = await instituteRepository.findOneBy({ id: parseInt(req.params.id) });
//         if (institute) {
//         await instituteRepository.remove(institute);
//         res.json({ message: "Institute deleted" });
//         } else {
//         res.json({ message: "Institute not found" });
//        }
//     };

static deleteInstitute = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const instituteRepository = AppDataSource.getRepository(Institute);

  try {
    let instituteToRemove = await instituteRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!instituteToRemove) {
      return res.status(404).json({ message: "Institute does not exist or is already deleted" });
    }

    instituteToRemove.deletedAt = new Date(); // Set the deletedAt timestamp
    await instituteRepository.save(instituteToRemove);

    return res.status(200).json({ message: "Institute has been soft deleted" });
  } catch (error) {
    console.error("Error deleting institute:", error);
    return res.status(500).json({ message: "An error occurred while deleting the institute." });
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
      const { firstName, phoneNumber, city } =
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
        
        institute.user.firstName = firstName ?? institute.user.firstName;
        // institute.user.lastName = lastName ?? institute.user.lastName;
        // institute.user.email = email ?? institute.user.email;
        institute.phoneNumber = phoneNumber ?? institute.phoneNumber;
        institute.city = city ?? institute.city;

        await AppDataSource.getRepository(User).save(institute.user);
      
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


    static async getApprovedInstitutes(req: Request, res: Response) {
      try {
        const institutes = await AppDataSource
          .getRepository(Institute)
          .createQueryBuilder('institute')
          .innerJoinAndSelect('institute.user', 'user')
          .where('institute.isverified = :isverified', { isverified: true })
          .getMany();
  
        res.status(200).json(institutes);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching institutes', error });
      }
    }

    static async getUnapprovedInstitutes(req: Request, res: Response) {
      try {
        const institutes = await AppDataSource
          .getRepository(Institute)
          .createQueryBuilder('institute')
          .innerJoinAndSelect('institute.user', 'user')
          .where('institute.isverified = :isverified', { isverified: false })
          .andWhere('institute.isRejected = :isRejected', { isRejected: false })
          .getMany();
        res.status(200).json(institutes);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching institutes', error });
      }
    }

    static async verifyOrReject(req: Request, res: Response){

      const action = req.params.action;
      try{
        if(action === 'verify'){
          const institute = await AppDataSource.getRepository(Institute).findOne({ where: { id: parseInt(req.params.id) } });
          if(!institute) return res.status(404).json({ message: 'Institute not found' });
          institute.isverified = true;
          await AppDataSource.getRepository(Institute).save(institute);
          return res.status(200).json({ message: 'Institute verified successfully', institute });
        }else if(action === 'reject'){
      
          const institute = await AppDataSource.getRepository(Institute).findOne({ where: { id: parseInt(req.params.id) } });
          if(!institute) return res.status(404).json({ message: 'Institute not found' });
          institute.isRejected = true;
          await AppDataSource.getRepository(Institute).save(institute);
          console.log(institute);
          return res.status(200).json({ message: 'Institute rejected successfully', institute });
        }


      }catch(error){
        res.status(500).json({ message: 'Error fetching institutes', error });
      }
    }


    
  //get total classes,teachers and students counts in a institute

  static getInstituteStatistics = async (req: Request, res: Response) => {
    try {


      const userId = req.user.userId
      const instituteRepository = AppDataSource.getRepository(Institute);
      const classRepository = AppDataSource.getRepository(Class);

      console.log("userId", userId)
      const institute = await instituteRepository.findOne({
        where: { user : { id : userId} }, // Ensure `instituteId` is a number
      });


      if (!institute) {
        return res.status(404).json({ message: "Institute not found" });
      }

      // Fetch counts for related entities
      const classes = await classRepository.find({ where: { institute: { id: institute.id } } });
      const totalClasses = classes.length;
      // class has student array, get all students from all classes
      const students = classes.map((cls) => cls.students).flat();

      // class has one teacher, get all unique teachers
      const teachers = classes.map((cls) => cls.teacher);

      const totalTeachers = teachers.length;
      const totalStudents = students.length;



    
      // Respond with the statistics
      res.json({
        instituteName: institute.name,
        statistics: {
          totalClasses,
          totalTeachers,
          totalStudents,
        },
      });
    } catch (error) {
      console.error("Error fetching institute statistics:", error);
      res.status(500).json({
        message: "Error fetching institute statistics",
        error: error.message,
      });
    }
  };


static getAllStudents = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const instituteRepository = AppDataSource.getRepository(Institute);

  const institute = await instituteRepository.findOne({ where: { user: { id: userId } } });

  const classRepository = AppDataSource.getRepository(Class);
  const classes = await classRepository.find({ where: { institute: { id: institute.id } } });

  const classCardRepository = AppDataSource.getRepository(ClassCard);
  // get students which have classses with classcards 

  const classCards = await classCardRepository.find({
    where: { classObject: { id: In(classes.map((cls) => cls.id)) } },
    relations: {
      student: {
        user: true,
      }
    },
  });

  const students = classCards.map((card) => card.student);
  res.json(students);
    
}

};