// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity()
// export class Institute {

//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string

//     @Column()
//     email: string

//     @Column()
//     city: string

// }

// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Teacher } from './Teacher';
// import { Student } from './Student';
// import { Class } from './Class';
// import { Grade } from './Grade';
// import { Notice } from './Notice';

// @Entity('institutes')
// export class Institute {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @OneToMany(() => Teacher, (teacher) => teacher.institute)
//   teachers: Teacher[];

//   @OneToMany(() => Student, (student) => student.institute)
//   students: Student[];

//   @OneToMany(() => Class, (classEntity) => classEntity.institute)
//   classes: Class[];

//   @OneToMany(() => Grade, (grade) => grade.institute)
//   grades: Grade[];

//   @OneToMany(() => Notice, (notice) => notice.institute)
//   notices: Notice[];
// }

