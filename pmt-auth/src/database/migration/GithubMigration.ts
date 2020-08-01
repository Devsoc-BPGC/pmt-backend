import { MigrationInterface, QueryRunner } from 'typeorm';

export class GithubMigration implements MigrationInterface {
	name?: string;
	async up(queryRunner: QueryRunner): Promise<void> {
	 await queryRunner.query(`CREATE TABLE "github" IF NOT EXISTS`);
	}
	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "github"`);
	}
}
