import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne ,CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm';
import { Teacher } from './Teacher';
import { Result } from './Result';
import { Institute } from './Institute';
import { Class } from './Class';

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
  
  @Column()
  totalMarks: number;

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
  class: Class;

  @OneToOne(() => Result, (result) => result.assignment)
  result: Result;
}
