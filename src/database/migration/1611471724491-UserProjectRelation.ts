import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserCardRelation1611471724491 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS projects_members_users (
			"projectsId" integer NOT NULL,
			"usersId" integer NOT NULL,
			PRIMARY KEY ("projectsId", "usersId")
		)`);
		await queryRunner.query(`ALTER TABLE "projects_members_users" 
			ADD CONSTRAINT "FK_f12d2be7201e8079ff063745da5"
			FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(`ALTER TABLE "projects_members_users"
			ADD CONSTRAINT "FK_4e4776c9ce3de6c7aa5f7d09c39"
			FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(`ALTER TABLE "projects" 
			ADD CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90"
			FOREIGN KEY (createdById) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "projects_members_users" 
			DROP CONSTRAINT "FK_4e4776c9ce3de6c7aa5f7d09c39"`
		);
		await queryRunner.query(`ALTER TABLE "projects_members_users" 
			DROP CONSTRAINT "FK_f12d2be7201e8079ff063745da5"`
		);
		await queryRunner.query(`ALTER TABLE "projects" 
			DROP CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90"`
		);
		await queryRunner.query('DROP TABLE projects_members_users');
	}

}
