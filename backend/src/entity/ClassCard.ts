import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Student } from './Student';

@Entity()
export class ClassCard {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    city : string

    @Column()
    institiute : String

    @Column()
    calssName : string

    @Column()
    teacher : string
  
    @OneToMany(() => Student, (student) => student.classCard)
    student : Student;

    

}


