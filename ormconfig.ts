import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'api_workspace_manager',
    entities: ['dist/src/**/*.entity.js'],
    migrations: ['dist/src/database/migrations/*.js'],
    cli: {
        migrationsDir: 'src/database/migrations'
    },
    dateStrings: true
};

export default config;