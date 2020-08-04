import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration implements MigrationInterface {
    name?: string | undefined;
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" IF NOT EXISTS`);
    }
    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
