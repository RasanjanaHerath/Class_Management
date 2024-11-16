import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn} from 'typeorm';
import { Student } from './Student';
import { Class } from './Class';
import { Institute } from './Institute';
import { Assignment } from './Assignment';
import { Notice } from './Notice';
import { User } from './User';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  teacherId: number;

  @Column()
  name: string;

  @Column()
  email : string;

  @Column()
  description : string;

  @Column()
  contact : string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  nic : string;

  @Column()
  phoneNumber : string;

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

  @OneToOne(() => User, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
}

