import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
<<<<<<< HEAD
import { Institute } from "./entity/Institute"
=======
import { Notice } from "./entity/Notice"
>>>>>>> 0fcab49 (nootice)

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
    entities: [User,Institute],
=======
    entities: [User,Notice],
>>>>>>> 0fcab49 (nootice)
    migrations: [],
    subscribers: [],
})
