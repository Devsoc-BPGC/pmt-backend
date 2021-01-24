import {MigrationInterface, QueryRunner} from 'typeorm';

export class ProjectMigration1610112388875 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "projects" (
			id SERIAL NOT NULL,
			name character varying NOT NULL,
			description text NOT NULL,
			created_time TIMESTAMP NOT NULL DEFAULT now(),
			updated_time TIMESTAMP NOT NULL DEFAULT now(),
			createdById integer,
			UNIQUE ("name"),
			PRIMARY KEY ("id")
		)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE projects');
	}

}
