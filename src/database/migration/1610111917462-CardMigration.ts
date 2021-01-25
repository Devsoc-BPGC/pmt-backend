import {MigrationInterface, QueryRunner} from 'typeorm';

export class CardMigration1610111917462 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS cards (
			id SERIAL NOT NULL,
			title text NOT NULL,
			description text NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT now(),
			updated_at TIMESTAMP NOT NULL DEFAULT now(),
			labels text array,
			"card_status" "cards_card_status_enum" NOT NULL DEFAULT 'todo',
			completed_at TIMESTAMP,
			deadline TIMESTAMP NOT NULL,
			boardId integer,
			createdById integer,
			PRIMARY KEY (id)
		)`);

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE cards');
	}

}
