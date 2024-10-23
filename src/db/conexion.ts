import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tiago',
    password: '123456',
    database: 'api_template',
    logging: true,
    synchronize: true,
});