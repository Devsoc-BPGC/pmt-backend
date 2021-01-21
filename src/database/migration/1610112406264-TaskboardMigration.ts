import {MigrationInterface, QueryRunner} from 'typeorm';

export class TaskboardMigration1610112406264 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS taskboards (
			id integer NOT NULL,
			name varchar(100) NOT NULL,
			description varchar(100) NOT NULL,
			PRIMARY KEY (id)
		)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE taskboards');
	}

}
