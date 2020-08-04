/**
 * Initialise tyeorm.
 *
 * @author Sarvesh Shinde <SarveshShinde64@gmail.com>
 */

import 'reflect-metadata';
import {createConnection, Connection} from 'typeorm';
import Locals from '../config/Locals';
import { Env } from '../interfaces/locals';
// import { Users } from '../database/entity/User';

export default class Database {
    public static async init (): Promise<Connection> {
        const env: Env = Locals.config();
        const host: string = env.is_docker ? env.docker.postgres.host : env.app.postgres.host;
        const connection: Connection = await createConnection({
            type: 'postgres',
            host: host,
            port: 5432,
            username: 'postgres',
            password: 'eatsleepcode',
            database: 'mello',
            entities: [
                'build/database/entity/**/*.js'
                ],
                migrations: [
                'build/database/migrations/**/*.js'
                ],
                subscribers: [
                'build/database/subscribers/**/*.js'
                ],
                cli: {
                'entitiesDir': 'build/database/entity/**/*.js',
                'migrationsDir': 'build/database/migrations/**/*.js',
                'subscribersDir': 'build/database/subscribers/**/*.js'
            },
            synchronize: false
            // Set to true when not using migrations
        });
        console.log('Hey, the database is listening on PORT: 5432');
        /* let user = new Users;
        user.firstName = 'Sarvesh';
        user.age = 20;
        user.lastName = 'Shinde';
        await connection.manager.save(user); */
        return connection;
    }
}
