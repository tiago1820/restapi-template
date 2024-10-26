import { DataSource } from "typeorm";
import { Student } from "../models/student.model";
import { Teacher } from "../models/teacher.model";
import { Course } from "../models/course.model";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tiago',
    password: '123456',
    database: 'api_template',
    logging: true,
    entities: [Student, Teacher, Course],
    synchronize: true
});