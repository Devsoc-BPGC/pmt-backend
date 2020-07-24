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
    public static async init (): Promise<any> {
        try {
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
                    'src/database/migration/**/*.ts'
                 ],
                 subscribers: [
                    'src/database/subscribers/**/*.ts'
                 ],
                 cli: {
                    'entitiesDir': 'src/database/entity/**/*.ts',
                    'migrationsDir': 'src/database/migration/**/*.ts',
                    'subscribersDir': 'src/database/subscribers/**/*.ts'
                }
            });
            console.log('Hey, the database is listening on PORT: 5432');
            /* let user = new Users;
            user.firstName = 'Sarvesh';
            user.age = 20;
            user.lastName = 'Shinde';
            await connection.manager.save(user); */
            return connection;
        } catch (err) {
            // Log the error here.
            console.log(err);
        }
    }
}
