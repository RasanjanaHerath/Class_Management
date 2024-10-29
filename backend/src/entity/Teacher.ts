import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Student } from './Student';
import { Class } from './Class';
import { Institute } from './Institute';
import { Assignment } from './Assignment';
import { Notice } from './Notice';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Institute, (institute) => institute.teachers)
  institute: Institute;

  @OneToMany(() => Student, (student) => student.teacher)
  students: Student[];

  @OneToMany(() => Class, (classEntity) => classEntity.teacher)
  classes: Class[];

  @OneToMany(() => Assignment, (assignment) => assignment.teacher)
  assignments: Assignment[];

  @OneToMany(() => Notice, (notice) => notice.teacher)
  notices: Notice[];
}
