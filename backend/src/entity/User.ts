import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm"
import { Teacher } from "./Teacher"
import { Institute } from "./Institute"

@Entity()
export class User {
    static id(id: any) {
        throw new Error("Method not implemented.")
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column({ nullable: true })
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

    @OneToOne(() => Institute, (institute) => institute.user)
    institute: Institute;

}
