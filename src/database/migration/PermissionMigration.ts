import { MigrationInterface, QueryRunner } from 'typeorm';

export class PermissionMigration implements MigrationInterface {
	name?: string;
	async up(queryRunner: QueryRunner): Promise<void> {
	 await queryRunner.query('CREATE TABLE "permissions" IF NOT EXISTS');
	}
	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE "permissions"');
	}
}
