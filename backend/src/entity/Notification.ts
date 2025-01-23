import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,ManyToMany, JoinTable } from "typeorm";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { Institute } from "./Institute";
import {User} from "./User";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  message: string;

  // @Column({ default: "all" }) // 'all', 'student', 'teacher', 'institute'
  // recipientType: string;

  // @Column({ nullable: true }) // For specific user or institute IDs
  // recipientId: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Teacher) 
  @JoinTable()
  teacher: Teacher;

  @ManyToMany(() => Student) 
  @JoinTable()
  student: Student;

  @ManyToMany(() => Institute) 
  @JoinTable()
  institute: Institute;

  @ManyToMany(() => User)
  @JoinTable()
  user: User;

}
