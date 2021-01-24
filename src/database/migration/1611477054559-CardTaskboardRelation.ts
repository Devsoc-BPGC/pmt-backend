import {MigrationInterface, QueryRunner} from 'typeorm';

export class CardTaskboardRelation1611477054559 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "cards" 
			ADD CONSTRAINT "FK_a45a6573ee229a27dd6d15bf11c"
			FOREIGN KEY (boardId) REFERENCES taskboards(id) ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "cards"
			DROP CONSTRAINT "FK_a45a6573ee229a27dd6d15bf11c"`
		);
	}

}
