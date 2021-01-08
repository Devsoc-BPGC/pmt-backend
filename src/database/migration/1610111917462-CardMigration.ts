import {MigrationInterface, QueryRunner} from 'typeorm';

export class CardMigration1610111917462 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS cards (
			id integer NOT NULL,
			title varchar(100) NOT NULL,
			description varchar(100) NOT NULL,
			PRIMARY KEY (id)
		)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE cards');
	}

}
