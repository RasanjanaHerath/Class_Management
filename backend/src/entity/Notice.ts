// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
// import { Institute } from './Institute';
// import { Teacher } from './Teacher';
// import { Student } from './Student';

// @Entity()
// export class Notice {

//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     role: string

//     @Column()
//     title: String

//     @Column()
//     message: string

//     @ManyToOne(() => Institute, (institute) => institute.notices)
//     institute: Institute;

//     @ManyToOne(() => Teacher, (teacher) => teacher.notices)
//     teacher: Teacher;
  
//     @ManyToOne(() => Student, (student) => student.notices)
//     student: Student;

// }
