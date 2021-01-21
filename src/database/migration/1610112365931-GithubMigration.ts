import {MigrationInterface, QueryRunner} from 'typeorm';

export class GithubMigration1610112365931 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS github (
			username varchar(30) NOT NULL,
			login varchar(30) NOT NULL,
			name varchar(30) NOT NULL,
			PRIMARY KEY (username)
		)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE github');
	}

}
