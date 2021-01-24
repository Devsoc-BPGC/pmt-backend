import {MigrationInterface, QueryRunner} from 'typeorm';

export class TaskboardMigration1610112406264 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "taskboards" (
			id SERIAL NOT NULL,
			name character varying NOT NULL,
			description text NOT NULL,
			github_repo_url text NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT now(),
			updated_at TIMESTAMP NOT NULL DEFAULT now(),
			projectId integer,
			createdById integer,
			PRIMARY KEY (id)
		)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE taskboards');
	}

}
