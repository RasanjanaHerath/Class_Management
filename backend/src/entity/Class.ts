import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Class {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    instituteName: string;

    @Column()
    subject: string;

    @Column()
    batch: string;

    @Column()
    grade: string;

    @Column({ type: 'timestamp' }) 
    dateTime: Date;

    @Column()
    teacherName: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 }) 
    feePerMonth: number;

    @Column()
    teacherExperience: string; 

    @Column()
    numberOfStudents: number;

    @Column()
    teacherContactPhoneNumber: string;

    @Column()
    modeOfTeaching: string; 
}
