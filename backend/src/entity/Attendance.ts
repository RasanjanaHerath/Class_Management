 import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
 import { Institute } from './Institute';

 
 @Entity()
 export class Attendance {
 
     @PrimaryGeneratedColumn()
     id: number

     @Column()
     classID: number
 
     @Column()
     date: Date
     
     @Column()
     isPresent: boolean
 
     @ManyToOne(() => Institute, (institute) => institute.attendances)
     institute: Institute;
 

 
 }
 
 