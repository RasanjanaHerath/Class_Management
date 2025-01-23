import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Unique, Column } from 'typeorm';
import { Student } from './Student';
import { Class } from './Class';

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

