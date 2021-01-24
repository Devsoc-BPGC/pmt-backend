import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserGithubRelation1611477018198 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" 
			ADD CONSTRAINT "FK_fa82b0f0ebcb91e126f0e7bdd2a"
			FOREIGN KEY ("github_username") REFERENCES "github"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users"
			DROP CONSTRAINT "FK_fa82b0f0ebcb91e126f0e7bdd2a"`
		);
	}

}
