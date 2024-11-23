import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Institute } from "./entity/Institute"
import { Notice } from "./entity/Notice"
import { Class } from "./entity/Class"
import { Teacher } from "./entity/Teacher"
import { Student } from "./entity/Student"
import { Assignment } from "./entity/Assignment"
import { Grade } from "./entity/Grade"
import { Result } from "./entity/Result"
import { Announcement } from "./entity/Announcement"
// import { EnrollClass } from "./entity/EnrollClass"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
<<<<<<< HEAD
    entities: [
        Student,
        Teacher,
        Notice,
        Institute,
        Class,
        Assignment,
        User,
        Grade,
        Result,
        Announcement

    ],
=======
    entities: [User,Institute,Notice,Class,EnrollClass],
>>>>>>> 45b766a (FEAT: Create a class page)
    migrations: [],
    subscribers: [],
    driver: require('mysql2')
})
