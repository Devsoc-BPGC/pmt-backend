import { MigrationInterface, QueryRunner } from 'typeorm';

export class CardMigration implements MigrationInterface {
	name?: string;
	async up(queryRunner: QueryRunner): Promise<void> {
	 await queryRunner.query('CREATE TABLE "cards" IF NOT EXISTS');
	}
	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE "cards"');
	}
}
