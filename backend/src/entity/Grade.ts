import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Institute } from './Institute';

@Entity('grades')
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  value: string;

  @ManyToOne(() => Institute, (institute) => institute.grades)
  institute: Institute;
}
