import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserMigration1610112413733 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "users" (
			id SERIAL NOT NULL,
			name character varying NOT NULL,
			email character varying NOT NULL,
			avatar_url text DEFAULT '',
			"org_role" "users_org_role_enum" NOT NULL DEFAULT 'crew',
			github_username text NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT now(),
			updated_at TIMESTAMP NOT NULL DEFAULT now(),
			githubUsername text,
			UNIQUE ("email"),
			UNIQUE ("github_username"),
			PRIMARY KEY ("id")
		)`);

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE users');
	}

}
