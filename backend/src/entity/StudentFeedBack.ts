import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()

export class StudentFeedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  classID: number;

  @Column()
  rating: number;

  @Column()
  comment: string;


}