import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn,Column, Unique, OneToMany } from 'typeorm';
import { Student } from './Student';
import { Class } from './Class';
import { Payment } from './Payment';

@Entity('class_cards')
export class ClassCard {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student.classCards, {
        nullable: false,
        onDelete: "CASCADE"
    })
    student: Student;

    @ManyToOne(() => Class, (classEntity) => classEntity.classCards, {
        nullable: false,
        onDelete: "CASCADE"
    })
    classObject: Class;

    @Column("simple-array",{nullable: true})
    attendanceDates: string[];
    
    @OneToMany(() => Payment, (payment) => payment.classCard)
    payments: Payment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
