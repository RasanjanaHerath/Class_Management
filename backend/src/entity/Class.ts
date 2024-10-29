// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity()
// export class Class {

//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     instituteName: string;

//     @Column()
//     subject: string;

//     @Column()
//     batch: string;

//     @Column()
//     grade: string;

//     @Column({ type: 'timestamp' }) 
//     dateTime: Date;

//     @Column()
//     teacherName: string;

//     @Column({ type: 'decimal', precision: 10, scale: 2 }) 
//     feePerMonth: number;

//     @Column()
//     teacherExperience: string; 

//     @Column()
//     numberOfStudents: number;

//     @Column()
//     teacherContactPhoneNumber: string;

//     @Column()
//     modeOfTeaching: string; 
// }



// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
// import { Institute } from './Institute';
// import { Teacher } from './Teacher';
// import { Student } from './Student';

// @Entity('classes')
// export class Class {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @Column()
//   schedule: string;

//   @Column()
//   subject: string;

//   @Column()
//   batch: string;

//   @Column()
//   grade: string;

//   @Column()
//   dateTime: string;

//   @ManyToOne(() => Teacher, (teacher) => teacher.classes)
//   teacher: Teacher;

//   @ManyToOne(() => Institute, (institute) => institute.classes)
//   institute: Institute;

//   @OneToMany(() => Student, (student) => student.class)
//   students: Student[];
// }
