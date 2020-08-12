import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import * as Permissions from '../database/entity/Permission';

@EntityRepository(Permissions.Permission)
export class PermissionRepository extends Repository<Permissions.Permission> {

	async getProjectPermissionsForUser(
		user_id: number,
		project_id: number
	): Promise<Permissions.Permission> {
		const perm = await this.findOne({
			where: {
				user_id: user_id,
				permission_type: Permissions.PermissionType.PROJECT,
				instance_id: project_id
			}
		});
		return perm!;
	}

	async getBoardPermissionsForUser(
		user_id: number,
		board_id: number
	): Promise<Permissions.Permission> {
		const perm = await this.findOne({
			where: {
				user_id: user_id,
				permission_type: Permissions.PermissionType.BOARD,
				instance_id: board_id
			}
		});
		return perm!;
	}

	async getCardPermissionForUser(
		user_id: number,
		card_id: number
	): Promise<Permissions.Permission> {
		const perm = await this.findOne({
			where: {
				user_id: user_id,
				permission_type: Permissions.PermissionType.CARD,
				instance_id: card_id
			}
		});
		return perm!;
	}
}
