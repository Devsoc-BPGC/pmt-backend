/**
 * Initialise tyeorm.
 *
 * @author Sarvesh Shinde <SarveshShinde64@gmail.com>
 */

import 'reflect-metadata';
import {createConnection, Connection} from 'typeorm';
// import { Users } from '../database/entity/User';

export default class Database {
    public static async init (): Promise<any> {
        try {
            const connection: Connection = await createConnection();
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
