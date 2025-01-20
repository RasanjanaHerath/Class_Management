import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Assignment } from './Assignment';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  score: string;

  @Column()
  feedback: string;

  @OneToOne(() => Assignment, (assignment) => assignment.result)
  assignment: Assignment;
}
