import 'reflect-metadata';
import {createConnection, Connection} from 'typeorm';
import {Users} from '../database/entity/User';

export default class Database {
    public static async init (): Promise<any> {
        try {
            const connection: Connection = await createConnection();
            console.log('Hey, the database is listening on PORT: 5432');
            return connection;
        } catch (err) {
            // Log the error here.
            console.log(err);
        }
    }
}