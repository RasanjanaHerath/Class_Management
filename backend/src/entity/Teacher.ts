import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, OneToOne, JoinColumn, JoinTable, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Student } from './Student';
import { Class } from './Class';
import { Institute } from './Institute';
import { Assignment } from './Assignment';
import { Notice } from './Notice';
import { User } from './User';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn()
  teacherId: number;

  @Column()
  name: string;

  @Column()
  email : string;

  @Column({ nullable: true })
  description : string;

  @Column()
  contact : string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  nic : string;

  @Column({ unique: true })
  phoneNumber : string;

  @Column()
  qualification: string;

  @Column({ type: 'int' })
  experience: number; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;



  @JoinTable()
  institutes: Institute[];
  @ManyToMany(() => Institute, (institute) => institute.teachers)
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
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
}

