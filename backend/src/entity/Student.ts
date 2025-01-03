import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Class } from './Class';
import { Institute } from './Institute';
import { Teacher } from './Teacher';
import { Notice } from './Notice';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Class, (classEntity) => classEntity.students, { nullable: true })
  class: Class;

  @ManyToOne(() => Institute, (institute) => institute.students, { nullable: true })
  institute: Institute;

  @ManyToOne(() => Teacher, (teacher) => teacher.students, { nullable: true })
  teacher: Teacher;

  @OneToMany(() => Notice, (notice) => notice.student, { nullable: true })
  notices: Notice[];
}
