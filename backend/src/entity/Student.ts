import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable,OneToOne,JoinColumn } from 'typeorm';
import { Class } from './Class';
import { Institute } from './Institute';
import { Teacher } from './Teacher';
import { Notice } from './Notice';
import { Assignment } from './Assignment';
import { User } from './User';
import { ClassCard } from './ClassCard';
import { StudentMessege } from './StudentMesseges';




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

  @ManyToOne(() => Teacher, (teacher) => teacher.students, { nullable: true })
  teacher: Teacher;

  @OneToMany(() => Notice, (notice) => notice.student, { nullable: true })
  notices: Notice[];

  @OneToMany(() => StudentMessege, (studentMessege) => studentMessege.student, { nullable: true })
  studentMesseges: StudentMessege[];



  @ManyToMany(() => Institute)
  @JoinTable()
  institute : Institute[]

  @OneToMany(() => ClassCard, (classCard) => classCard.student)
  classCards: ClassCard[];

  @OneToOne(() => User, {
      nullable: false,
      onDelete: "CASCADE",
    })
    @JoinColumn()
    user: User;
  
}
