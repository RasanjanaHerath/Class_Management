import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Assignment } from './Assignment';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  result: string;

  @OneToOne(() => Assignment, (assignment) => assignment.result)
  assignment: Assignment;
}
