import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserPermissionRelation1611476987262 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "permissions" 
			ADD CONSTRAINT "FK_eab26c6cc4b9cc604099bc32dff"
			FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "permissions"
			DROP CONSTRAINT "FK_eab26c6cc4b9cc604099bc32dff"`
		);
	}

}
