import { Entity, PrimaryGeneratedColumn, Column, OneToMany , OneToOne, JoinColumn} from 'typeorm';
import { Teacher } from './Teacher';
import { Student } from './Student';
import { Class } from './Class';
import { Grade } from './Grade';
import { Notice } from './Notice';
import { Assignment } from './Assignment';
import { User } from './User';

@Entity('institutes')
export class Institute {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  phoneNumber: string

  @Column()
  city: string

  @OneToMany(() => Teacher, (teacher) => teacher.institute)
  teachers: Teacher[];

  @OneToMany(() => Student, (student) => student.institute)
  students: Student[];

  @OneToMany(() => Class, (classEntity) => classEntity.institute)
  classes: Class[];

  @OneToMany(() => Grade, (grade) => grade.institute)
  grades: Grade[];

  @OneToMany(() => Notice, (notice) => notice.institute)
  notices: Notice[];

  @OneToMany(() => Assignment, (assignment) => assignment.institute)
  assignments: Assignment[];

  @OneToOne(() => User, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
}

