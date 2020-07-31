import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import { Card } from '../entity/Card';
import { Users } from '../entity/User';
import { UserRepository } from './User';

@EntityRepository(Card)
export class CardRepository extends Repository<Card> {
   async findMembersForCard(id: number): Promise<Users[]> {
      const card = await this.findOne(id, {
         relations: ['members']
      });
      return card!.members!;
   }

   findAllDetails(id: number): Promise<Card|undefined> {
      return this.findOne(id, {
         relations: ['board', 'members', 'created_by']
      });
   }

   async assignMemberToCard(user_id: number, card_id: number): Promise<Card| undefined> {
      const userRepo = getCustomRepository(UserRepository);
      const user = await userRepo.findOne(user_id);
      if (user) {
         const card = await this.findOne(card_id);
         if (card) {
            card.members?.push(user);
            return card;
         }
      }
   }
}
