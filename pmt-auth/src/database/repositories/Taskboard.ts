import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import { Taskboard } from '../entity/Taskboard';
import { Project } from '../entity/Project';
import { UserRepository } from './User';
import { Card } from '../entity/Card';
import { Users } from '../entity/User';

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

   async addMemberToTaskBoard(user_id: number, board_id: number): Promise<void> {
      const userRepo = getCustomRepository(UserRepository);
      const user = await userRepo.findOne(user_id);
      if (user) {
         const board = await this.findOne(board_id);
         if (board) {
            board.members?.push(user);
         }
      }
   }

   findAllDetails(id: number): Promise<Taskboard|undefined> {
      return this.findOne(id, {
         relations: ['project', 'created_by', 'cards', 'members']
      });
   }
}
