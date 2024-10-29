// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
// import { Teacher } from './Teacher';
// import { Result } from './Result';

// @Entity('assignments')
// export class Assignment {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   title: string;

//   @Column()
//   description: string;

//   @ManyToOne(() => Teacher, (teacher) => teacher.assignments)
//   teacher: Teacher;

//   @OneToOne(() => Result, (result) => result.assignment)
//   result: Result;
// }
