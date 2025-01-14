import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, OneToOne, JoinColumn, JoinTable, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Student } from './Student';
import { Class } from './Class';
import { Institute } from './Institute';
import { Assignment } from './Assignment';
import { Announcement } from './Announcement';
import { Notice } from './Notice';
import { User } from './User';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn()
  teacherId: number;

  @Column({ nullable: true })
  description : string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  nic : string;

  @Column({ unique: true , nullable:true})
  phoneNumber : string;

  @Column({ nullable: true })
  qualification: string;
  
  @Column("simple-array", { nullable: true })
  subjects: string[];

  @Column({ nullable:true })
  experience: string; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;



 
  @ManyToMany(() => Institute, (institute) => institute.teachers)
  @JoinTable()
  institute: Institute[];

  @OneToMany(() => Student, (student) => student.teacher)
  students: Student[];

  @OneToMany(() => Class, (classEntity) => classEntity.teacher)
  classes: Class[];

  @OneToMany(() => Assignment, (assignment) => assignment.teacher)
  assignments: Assignment[];

  @OneToMany(() => Announcement, (announcement) => announcement.teacher)
  announcements: Assignment[];

  @OneToMany(() => Notice, (notice) => notice.teacher)
  notices: Notice[];

  @OneToOne(() => User, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
}

