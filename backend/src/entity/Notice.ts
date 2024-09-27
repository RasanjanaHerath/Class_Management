import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Notice {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    role: string

    @Column()
    title: String

    @Column()
    message: string

}
