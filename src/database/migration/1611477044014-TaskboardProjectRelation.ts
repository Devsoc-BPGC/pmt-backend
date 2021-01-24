import {MigrationInterface, QueryRunner} from 'typeorm';

export class TaskboardProjectRelation1611477044014 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "taskboards" 
			ADD CONSTRAINT "FK_c477aac8a5f06113874e63981db"
			FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "taskboards" 
			DROP CONSTRAINT "FK_c477aac8a5f06113874e63981db"`
		);
	}
}
