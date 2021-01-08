import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserMigration1610112413733 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (
			id integer NOT NULL,
			name varchar(40) NOT NULL,
			email varchar(40) NOT NULL,
			PRIMARY KEY (id)
		)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE users');
	}

}
