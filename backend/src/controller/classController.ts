import e, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Class } from "../entity/Class";
import { Teacher } from "../entity/Teacher";
import { Institute } from "../entity/Institute";
import { User } from "../entity/User";



export class classController {
  static getClassesByInstitute = async (req: Request, res: Response) => {
    const { instituteId } = req.params;
    try {
      const classes = await AppDataSource.getRepository(Class).find({
        where: { institute: { id: parseInt(instituteId) } },
        
      });
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching classes", error });
    }
  };

  static getTeachersByClass = async (req: Request, res: Response) => {
    const { classId } = req.params;
    try {
      const classEntity = await AppDataSource.getRepository(Class).findOne({
        where: { id: parseInt(classId) },
        relations: ["teachers"],
      });
      res.json(classEntity?.teacher || []);
    } catch (error) {
      res.status(500).json({ message: "Error fetching teachers", error });
    }
  };

  static getClassById = async (req: Request, res: Response) => {

    try {
      const classEntity = await AppDataSource.getRepository(Class).findOne({
        where: { id: parseInt(req.params.id) },
        relations: ['teacher', 'institute', 'students', 'assignments'],
      });
      if (!classEntity) {
        return res.status(404).json({ message: 'Class not found' });
      }
      return res.status(200).json(classEntity);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  static getAll = async (req: Request, res: Response) => {
    const classRepository = AppDataSource.getRepository(Class);
    try {
      const classes = await classRepository.find({ relations: ['teacher', 'institute', 'students', 'assignments'] });
      if (!Array.isArray(classes)) {
        return res.status(500).json({ message: 'Error fetching classes' });
      } // console.log('Classes from cobtroller getAll:', classes);
      const lastClass = classes[classes.length - 1];
      console.log('Last class:', lastClass);
      return res.status(200).json(classes);
    } catch (error) {
      console.error('Error fetching classes:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  //get by teacher and show pages if isverify is true
  static getClassesByTeacher = async (req: Request, res: Response) => {
    try {
      const teacherRepository = AppDataSource.getRepository(Teacher);
      const classRepository = AppDataSource.getRepository(Class);

      // Fetch the teacherId using the userId
      const teacher = await teacherRepository.findOne({ where: { user: { id: req.user.userId } } });

      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      const teacherId = teacher.teacherId;

      // Fetch verified classes
      const verifiedClasses = await classRepository.find({
        where: { teacher: { teacherId: teacherId }, isverify: true },
      });

      // Fetch pending classes
      const pendingClasses = await classRepository.find({
        where: { teacher: { teacherId: teacherId }, isverify: false },
      });

      res.status(200).json({
        verifiedClasses,
        pendingClasses,
      });
    } catch (error) {
      console.error('Error fetching classes:', error);
      res.status(500).json({ message: 'Error fetching classes', error });
    }
  };
 
    // static createClass = async (req: Request, res: Response) => {
    //     const { subject, teacherId, numberOfStudents, grade, startTime, endTime, feePerMonth, scheduleDay,InstituteId} = req.body;
    //     const classRepository = AppDataSource.getRepository(Class);
    //     const teacherRepository = AppDataSource.getRepository(Teacher);
    //     const instituteRepository = AppDataSource.getRepository(Institute);
    
    //     try {
    //       // Find the teacher by ID
    //       const teacher = await teacherRepository.findOne({ where: { teacherId } });

    //       if(!InstituteId){
    //         return res.status(404).json({ message: 'Institute is Required' });
    //       }
    //       const institute = await instituteRepository.findOne({ where: {  id:InstituteId } });
    
    //       if (!teacher) {
    //         return res.status(404).json({ message: 'Teacher not found' });
    //       }

          
    //       if(!institute){
    //         return res.status(404).json({ message: 'Institute not found' });
    //       }
    
    //       // Create a new class
    //       const newClass = new Class();
    //       newClass.subject = subject;
    //         newClass.grade = grade;
    //         newClass.startTime = startTime;
    //         newClass.endTime = endTime;
    //         newClass.feePerMonth = feePerMonth;
    //         newClass.scheduleDay = scheduleDay;
    //         newClass.numberOfStudents = numberOfStudents;
    //         newClass.teacher = teacher;
    //         newClass.institute = institute;
    
    //       // Save the new class
    //       await classRepository.save(newClass);
    
    //       res.status(201).json({ message: 'Class created successfully', class: newClass });
    //     } catch (error) {
    //       console.error('Error creating class:', error);
    //       res.status(500).json({ message: 'Error creating class', error: error.toString() });
    //     }
    //   };

    //     try {
    //       const teacher = await teacherRepository.findOne({
    //         where: { user },
    //         relations: ["user"],
    //       });
    //       // Find the teacher by ID
    //       //const teacher = await teacherRepository.findOne({where:{ teacherId:teacherId } });
    
    //       if (!teacher) {
    //         return res.status(404).json({ message: 'Teacher not found' }); 
    //       }

    //       // Find the institute by ID
    //       const institute = await instituteRepository.findOne({ where: { id: instituteId } });

    //       if (!institute) {
    //         return res.status(404).json({ message: 'Institute not found' });
    //       }
    
    //       // Create a new class
    //       const newClass = new Class();
    //       newClass.subject = subject;
    //         newClass.grade = grade;
    //         newClass.startTime = startTime;
    //         newClass.endTime = endTime;
    //         newClass.feePerMonth = feePerMonth;
    //         newClass.scheduleDay = scheduleDay;
    //         newClass.numberOfStudents = numberOfStudents;
    //         newClass.teacher = teacher;
    //         newClass.institute = institute;
    
    //       // Save the new class
    //       await classRepository.save(newClass);
    
    //       res.status(201).json({ message: 'Class created successfully', class: newClass });
    //     } catch (error) {
      //       console.error('Error creating class:', error);
      //       res.status(500).json({ message: 'Error creating class', error: error.toString() });
    //     }
    //   };

    static createClass = async (req: Request, res: Response) => {
      const { subject, grade, instituteId, scheduleDay, startTime, endTime, feePerMonth, numberOfStudents,isverify } = req.body;
  
      try {

        if(!instituteId){
          return res.status(404).json({ message: 'Institute is Required' });
        }

        const instituteRepository = AppDataSource.getRepository(Institute);
        const institute = await instituteRepository.findOne({ where: { id: instituteId } });
        const teacherRepository = AppDataSource.getRepository(Teacher);
        const userRepository = AppDataSource.getRepository(User);
        
        const userId = req.user?.userId;

        if(!userId){
          return res.status(404).json({ message: 'User not found' });
        }

        const user = await userRepository.findOne({
          where: { id: userId },
        });

        const userInst = await userRepository.findOne({
          where: { institute },
        });

        const teacher = await teacherRepository.findOne({
          where: { user },
          relations: ["user"],
        });



        if (!institute) {
          return res.status(404).json({ message: 'Institute not found' });
        }
  
        if (!teacher) {
          return res.status(404).json({ message: 'Teacher not found' });
        }
  
        const classRepository = AppDataSource.getRepository(Class);
        const newClass = new Class();
        newClass.subject = subject;
        newClass.grade = grade;
        newClass.institute = institute;
        newClass.teacher = teacher;
        newClass.scheduleDay = scheduleDay;
        newClass.startTime = startTime;
        newClass.endTime = endTime;
        newClass.feePerMonth = feePerMonth;
        newClass.numberOfStudents = numberOfStudents;
        newClass.isverify = false;
       

  

        await classRepository.save(newClass);
        // return res.status(201).json(newClass);
      return res.status(201).json({ newClass });
      } catch (error) {
        console.error('Error creating class:', error);
        return res.status(500).json({ message: 'An error occurred while creating the class.' });
      }
    };

    // static updateClass = async (req: Request, res: Response) => {
    //   const { subject, instituteId, numberOfStudents, grade, startTime, endTime, feePerMonth, scheduleDay, isverify } = req.body;
    //   const classRepository = AppDataSource.getRepository(Class);
  
    //   try {
    //     if(!instituteId){
    //       return res.status(404).json({ message: 'Institute is Required' });
    //     }

    //     const instituteRepository = AppDataSource.getRepository(Institute);
    //     const institute = await instituteRepository.findOne({ where: { id: instituteId } });
    //     const teacherRepository = AppDataSource.getRepository(Teacher);
    //     const userRepository = AppDataSource.getRepository(User);
        
    //     const userId = req.user?.userId;

    //     if(!userId){
    //       return res.status(404).json({ message: 'User not found' });
    //     }

    //     const user = await userRepository.findOne({
    //       where: { id: userId },
    //     });

    //     const userInst = await userRepository.findOne({
    //       where: { institute },
    //     });

    //     const teacher = await teacherRepository.findOne({
    //       where: { user },
    //       relations: ["user"],
    //     });

    //     if (!institute) {
    //       return res.status(404).json({ message: 'Institute not found' });
    //     }
  
    //     if (!teacher) {
    //       return res.status(404).json({ message: 'Teacher not found' });
    //     }
    //     // Find the class by ID from the request parameters
    //     const existingClass = await classRepository.findOne({ where: { id: parseInt(req.params.id) } });
  
    //     if (!existingClass) {
    //       return res.status(404).json({ message: 'Class not found' });
    //     }
  
    //     // Update the class properties
    //     existingClass.subject = subject;
    //     existingClass.grade = grade;
    //     existingClass.startTime = startTime;
    //     existingClass.endTime = endTime;
    //     existingClass.scheduleDay = scheduleDay;
    //     existingClass.feePerMonth = feePerMonth;
    //     existingClass.numberOfStudents = numberOfStudents;
    //     //existingClass.isverify = isverify;
    //     existingClass.institute = institute;
    //     existingClass.teacher = teacher; // Update the teacher for the class
  
    //     // Save the updated class to the database
    //     await classRepository.save(existingClass);
  
    //     // Respond with a success message and the updated class
    //     res.json({ message: 'Class updated', class: existingClass });
    //   } catch (error) {
    //     console.error('Error updating class:', error);
    //     res.status(500).json({ message: 'Error updating class', error: error.toString() });
    //   }
    // };

    static updateClass = async (req: Request, res: Response) => {
      const { id } = req.params;
      const { subject, grade, startTime, endTime, scheduleDay, feePerMonth, numberOfStudents, isverify } = req.body;
      const classRepository = AppDataSource.getRepository(Class);
  
      try {
        const existingClass = await classRepository.findOneBy({ id: parseInt(id) });
  
        if (!existingClass) {
          return res.status(404).json({ message: 'Class not found' });
        }
  
        existingClass.subject = subject;
        existingClass.grade = grade;
        existingClass.startTime = startTime;
        existingClass.endTime = endTime;
        existingClass.scheduleDay = scheduleDay;
        existingClass.feePerMonth = feePerMonth;
        existingClass.numberOfStudents = numberOfStudents;
        //existingClass.isverify = isverify;
  
        await classRepository.save(existingClass);
  
        res.json({ message: 'Class updated', class: existingClass });
      } catch (error) {
        console.error('Error updating class:', error);
        res.status(500).json({ message: 'Error updating class', error: error.toString() });
      }
    };


    // Delete a class
    static deleteClass = async (req: Request, res: Response) => {
        const classRepository = AppDataSource.getRepository(Class);

        // Find the class by ID from the request parameters
        const existingClass = await classRepository.findOneBy({ id: parseInt(req.params.id) });

        if (existingClass) {
            // Remove the class if found
            await classRepository.remove(existingClass);
            // Respond with a success message
            res.json({ message: "Class deleted" });
        } else {
            // If the class is not found, respond with a message
            res.status(404).json({ message: "Class not found" });
        }
    };
    

}