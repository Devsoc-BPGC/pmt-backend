import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserCardRelation1611475439676 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS cards_members_users (
			"cardsId" integer NOT NULL,
			"usersId" integer NOT NULL,
			CONSTRAINT "PK_69c2a8584f98d31dbffa42f2afe" PRIMARY KEY ("cardsId", "usersId")
		)`);
		await queryRunner.query(`ALTER TABLE "cards_members_users" 
			ADD CONSTRAINT "FK_8dbbdb321195547c3a503d1547a" 
			FOREIGN KEY ("cardsId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(`ALTER TABLE "cards_members_users" 
			ADD CONSTRAINT "FK_1676f8302c66be050c4206c6a90" 
			FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(`ALTER TABLE "cards" 
			ADD CONSTRAINT "FK_f6c4a23229e3fa778273eb89502" 
			FOREIGN KEY (createdById) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "cards_members_users" 
			DROP CONSTRAINT "FK_1676f8302c66be050c4206c6a90"`
		);
		await queryRunner.query(`ALTER TABLE "cards_members_users" 
			DROP CONSTRAINT "FK_8dbbdb321195547c3a503d1547a"`
		);
		await queryRunner.query('DROP TABLE cards_members_users');
		await queryRunner.query(`ALTER TABLE "cards" 
			DROP CONSTRAINT "FK_f6c4a23229e3fa778273eb89502"`
		);
	}
}
