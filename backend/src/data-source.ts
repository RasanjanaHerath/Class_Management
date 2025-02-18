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
import { Notification } from "./entity/Notification"
import { Announcement } from "./entity/Announcement"
import { ClassCard } from "./entity/ClassCard"
import { StudentMessege } from "./entity/StudentMesseges"
import { StudentFeedback } from "./entity/StudentFeedBack"
import { Attendance } from "./entity/Attendance"
import { Payment } from "./entity/Payment"
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
        Announcement,
        ClassCard,
        StudentMessege,
        StudentFeedback,
        Attendance,
        Result,
        Notification,
        ClassCard,
        StudentFeedback,
        Attendance,
        Payment,

    ],
    migrations: [],
    subscribers: [],
    driver: require('mysql2')
})
