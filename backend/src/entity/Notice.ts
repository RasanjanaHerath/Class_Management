import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Institute } from './Institute';
import { Teacher } from './Teacher';
import { Student } from './Student';
import { Class } from "./Class";
import { User } from "./User";

@Entity()
export class Notice {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    role: string;

    @Column()
    title: String;

    @Column({ default: '' })
    message: string;

    @ManyToOne(() => Institute, (institute) => institute.notices)
    institute: Institute;

    @ManyToOne(() => Teacher, (teacher) => teacher.notices)
    teacher: Teacher;
  
    @ManyToOne(() => Student, (student) => student.notices)
    student: Student;

    @ManyToOne(() => Class, (classes) => classes.notices)
    classes: Class;

    @ManyToOne(() => User   , (user) => user.notices)
    user: User;

}

