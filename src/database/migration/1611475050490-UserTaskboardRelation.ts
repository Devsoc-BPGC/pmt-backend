import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserTaskboardRelation1611475050490 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS taskboards_members_users (
			"taskboardsId" integer NOT NULL,
			"usersId" integer NOT NULL,
			PRIMARY KEY ("taskboardsId", "usersId")
		)`);
		await queryRunner.query(`ALTER TABLE "taskboards_members_users"
			ADD CONSTRAINT "FK_d0097ef061339eda061038c7b00"
			FOREIGN KEY ("taskboardsId") REFERENCES "taskboards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(`ALTER TABLE "taskboards_members_users" 
			ADD CONSTRAINT "FK_36f1cdf161a84820397ae34c758"
			FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(`ALTER TABLE "taskboards" 
			ADD CONSTRAINT "FK_8d4a2eb567ea346a63dcce2bbe3"
			FOREIGN KEY (createdById) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "taskboards_members_users" 
			DROP CONSTRAINT "FK_36f1cdf161a84820397ae34c758"`
		);
		await queryRunner.query(`ALTER TABLE "taskboards_members_users" 
			DROP CONSTRAINT "FK_d0097ef061339eda061038c7b00"`
		);
		await queryRunner.query('DROP TABLE taskboards_members_users');
		await queryRunner.query(`ALTER TABLE "taskboards" 
			DROP CONSTRAINT "FK_8d4a2eb567ea346a63dcce2bbe3"`
		);
	}
}
