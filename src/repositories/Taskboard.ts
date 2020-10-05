import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import { Taskboard } from '../database/entity/Taskboard';
import { Project } from '../database/entity/Project';
import { UserRepository } from './User';
import { Card } from '../database/entity/Card';
import { Users } from '../database/entity/User';

@EntityRepository(Taskboard)
export class TaskboardRepository extends Repository<Taskboard> {
	async findCardsForBoard(id: number): Promise<Card[]> {
		const board = await this.findOne(id, {
			relations: ['cards']
		});
		return board!.cards!;
	}

	async findMembersOfBoard(id: number): Promise<Users[]> {
		const board = await this.findOne(id, {
			relations: ['members']
		});
		return board!.members!;
   }

   async findCreator(id: number): Promise<Users> {
      const board = await this.findOne(id, {
         relations: ['created_by']
      });
      return board?.created_by!;
   }

	async addMemberToTaskBoard(
		user_id: number,
		board: Taskboard
	): Promise<void> {
		const userRepo = getCustomRepository(UserRepository);
		const user = await userRepo.findOne(user_id, {
			relations: ['boards']
		});
		if (user) {
			user.boards?.push(board);
			await userRepo.save(user);
		}
	}

	findAllDetails(id: number): Promise<Taskboard | void> {
		const board = this.findOne(id, {
			relations: ['project', 'created_by', 'cards', 'members']
		});
		return board!;
	}
}
