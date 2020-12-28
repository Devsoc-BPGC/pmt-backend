import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProjectMigration implements MigrationInterface {
	name?: string;
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE TABLE "projects" IF NOT EXISTS');
	}
	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE "projects"');
	}
}
