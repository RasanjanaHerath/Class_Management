import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Institute } from './Institute';
import { Teacher } from './Teacher';
import { Student } from './Student';
import { Assignment } from './Assignment';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  teacherId: number;

  @Column()
  teacherName: string;

  @Column()
  scheduleDay: string;

  @Column()
  subject: string;

  @Column()
  teacherExperience: string;
  
  @Column()
  instituteName: string;

  @Column()
  grade: string;

  @Column()
  numberOfStudents: number;

  @Column({default: false})
  isverify: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) 
  feePerMonth: number;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.classes)
  teacher: Teacher;

  @ManyToOne(() => Institute, (institute) => institute.classes)
  institute: Institute;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];

  @OneToMany(() => Assignment, (assignment) => assignment.class)
  assignments: Assignment[];
}
