import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Student } from './Student';

@Entity()
export class StudentMessege {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    institute : number

    @Column()
    title : String

    @Column()
    message : string

    @ManyToOne(() => Student, (student) => student.studentMesseges)
    student: Student;
}