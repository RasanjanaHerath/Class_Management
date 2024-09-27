import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Institute } from "./entity/Institute"
import { Notice } from "./entity/Notice"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User,Institute,Notice],
    migrations: [],
    subscribers: [],
})
