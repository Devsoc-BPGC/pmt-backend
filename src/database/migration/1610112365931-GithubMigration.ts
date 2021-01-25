import {MigrationInterface, QueryRunner} from 'typeorm';

export class GithubMigration1610112365931 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS github (
			username text NOT NULL,
			login text NOT NULL,
			avatar_url text NOT NULL,
			html_url text NOT NULL,
			repos_url text NOT NULL,
			name text NOT NULL,
			company text NOT NULL,
			blog text NOT NULL,
			location text NOT NULL,
			email text NOT NULL,
			bio text NOT NULL,
			twitter_username text NOT NULL,
			public_repos integer NOT NULL,
			public_gists integer NOT NULL,
			followers integer NOT NULL,
			following integer NOT NULL,
			private_gists integer NOT NULL,
			total_private_repos integer NOT NULL,
			owned_private_repos integer NOT NULL,
			PRIMARY KEY (username)
		)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE github');
	}

}
