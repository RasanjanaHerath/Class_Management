import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable,OneToOne,JoinColumn } from 'typeorm';
import { Class } from './Class';
import { Institute } from './Institute';
import { Teacher } from './Teacher';
import { Notice } from './Notice';
import { Assignment } from './Assignment';
import { User } from './User';
import { ClassCard } from './ClassCard';



@Entity('students')
export class Student {
  
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  school: string;

  @Column({nullable:true})
  birthday: string

  @Column()
  age: string

  @Column()
  address: string

  @Column()
  nic: string

  @Column()
  telephone: string

  @Column()
  parents_name: string

  @Column()
  parents_number: string

  @ManyToOne(() => Class, (classEntity) => classEntity.students, { nullable: true })
  classes: Class;

  @ManyToOne(() => Institute, (institute) => institute.students, { nullable: true })
  institute: Institute;

  @ManyToOne(() => Teacher, (teacher) => teacher.students, { nullable: true })
  teacher: Teacher;

  @OneToMany(() => Notice, (notice) => notice.student, { nullable: true })
  notices: Notice[];

  @ManyToMany(() => Assignment, (assignment) => assignment.student, { nullable: true })
  @JoinTable()
  assignment: Assignment[];
  @ManyToOne(() => ClassCard, (classCard) => classCard.student)
  classCard : ClassCard

  @OneToOne(() => User, {
      nullable: false,
      onDelete: "CASCADE",
    })
    @JoinColumn()
    user: User;
  
}
