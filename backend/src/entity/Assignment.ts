import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne ,CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany,JoinTable} from 'typeorm';
import { Teacher } from './Teacher';
import { Result } from './Result';
import { Institute } from './Institute';
import { Class } from './Class';
import { Student } from './Student';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column({ nullable: true })
  assignmentFilePath: string; // Add this column to store the file path

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Teacher, (teacher) => teacher.assignments)
  teacher: Teacher;

  @ManyToOne(() => Institute, (institute) => institute.assignments)
  institute: Institute;

  @ManyToOne(() => Class, (classes) => classes.assignments)
  classes: Class;

  @OneToOne(() => Result, (result) => result.assignment)
  result: Result;

  @ManyToMany(() => Student)
  @JoinTable()
  student: Student;
}
