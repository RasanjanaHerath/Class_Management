// src/entity/Student.ts
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
// import { Class } from './Class';
// import { Institute } from './Institute';
// import { Teacher } from './Teacher';
// import { Notice } from './Notice';

// @Entity('students')
// export class Student {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @ManyToOne(() => Class, (classEntity) => classEntity.students)
//   class: Class;

//   @ManyToOne(() => Institute, (institute) => institute.students)
//   institute: Institute;

//   @ManyToOne(() => Teacher, (teacher) => teacher.students)
//   teacher: Teacher;

//   @OneToMany(() => Notice, (notice) => notice.student)
//   notices: Notice[];
// }
