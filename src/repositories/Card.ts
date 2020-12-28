import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import { Card, CardStatus } from '../database/entity/Card';
import { Users } from '../database/entity/User';
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

	async assignMemberToCard(user_id: number, card: Card): Promise<void> {
		const userRepo = getCustomRepository(UserRepository);
		const user = await userRepo.findOne(user_id, {
			relations: ['cards']
		});
		if (user) {
			user.cards?.push(card);
			await userRepo.save(user);
		}
	}

	async changeCardStatus(card: Card, status: CardStatus): Promise<void> {
		card.card_status = status;
		await this.save(card);
	}

	async findCreatorOfCard(id: number): Promise<Users> {
		const card = await this.findOne(id, {
			relations: ['created_by']
		});
		return card!.created_by!;
	}

}
