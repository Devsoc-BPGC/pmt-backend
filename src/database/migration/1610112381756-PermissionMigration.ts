import {MigrationInterface, QueryRunner} from 'typeorm';

export class PermissionMigration1610112381756 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS permissions (
			id integer NOT NULL,
			user_id integer NOT NULL,
			PRIMARY KEY (id)
		)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE permissions');
	}

}
