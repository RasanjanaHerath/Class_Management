import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { Teacher } from "./Teacher"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    userName: string

    @Column()
    role: string

    @Column()
    password: string

    @OneToOne(() => Teacher, (teacher) => teacher.user)
    teacher:Teacher
}
