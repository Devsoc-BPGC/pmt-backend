import {MigrationInterface, QueryRunner} from 'typeorm';

export class PermissionMigration1610112381756 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "permissions" (
			"id" SERIAL NOT NULL,
			"user_id" integer NOT NULL,
			"add" "permissions_add_enum" NOT NULL DEFAULT 'denied',
			"view" "permissions_view_enum" NOT NULL DEFAULT 'denied',
			"edit" "permissions_edit_enum" NOT NULL DEFAULT 'denied',
			"delete" "permissions_delete_enum" NOT NULL DEFAULT 'denied',
			"add_member" "permissions_add_member_enum" NOT NULL DEFAULT 'denied',
			"remove_member" "permissions_remove_member_enum" NOT NULL DEFAULT 'denied',
			"permission_type" "permissions_permission_type_enum" NOT NULL,
			"instance_id" integer NOT NULL,
			"role" "permissions_role_enum" NOT NULL DEFAULT 'member',
			"created_at" TIMESTAMP NOT NULL DEFAULT now(),
			"updated_at" TIMESTAMP NOT NULL DEFAULT now(),
			"userId" integer,
			PRIMARY KEY (id)
		)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE permissions');
	}

}
