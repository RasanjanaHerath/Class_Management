import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne ,CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm';
import { Teacher } from './Teacher';
import { Result } from './Result';

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

  @Column()
  teacherId: number;

  @Column()
  instituteId: number;

  @Column()
  classId: number;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Teacher, (teacher) => teacher.assignments)
  teacher: Teacher;

  @OneToOne(() => Result, (result) => result.assignment)
  result: Result;
}
