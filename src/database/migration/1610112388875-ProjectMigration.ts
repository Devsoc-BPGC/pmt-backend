import {MigrationInterface, QueryRunner} from 'typeorm';

export class ProjectMigration1610112388875 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS projects (
			id integer NOT NULL,
			name varchar(100) NOT NULL,
			description varchar(100) NOT NULL,
			PRIMARY KEY (id)
		)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE projects');
	}

}
