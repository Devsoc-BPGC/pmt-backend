import {
	Arg,
	Field,
	FieldResolver,
	InputType,
	Mutation,
	Query,
	Resolver,
	Root
} from 'type-graphql';
import { Any, getCustomRepository } from 'typeorm';
import { Card, CardStatus } from '../database/entity/Card';
import { Users } from '../database/entity/User';
import { CardRepository } from '../repositories/Card';
import { TaskboardRepository } from '../repositories/Taskboard';
import { UserRepository } from '../repositories/User';

@InputType()
class CardInput {
	@Field()
	title!: string;

	@Field()
	description!: string;

	@Field()
	board_id!: number;

	@Field()
	created_by_id!: number;

	@Field(() => [String], { nullable: true })
	labels!: string[];

	@Field()
	deadline!: Date;
}

@Resolver(Card)
export class CardResolver {
	CardRepo = getCustomRepository(CardRepository);
	UserRepo = getCustomRepository(UserRepository);

	@Mutation((type) => Card)
	async addCard(
		@Arg('card_data')
			{
				title,
				description,
				board_id,
				labels,
				created_by_id,
				deadline
			}: CardInput
	): Promise<Card> {
		const user = await this.UserRepo.findOne(created_by_id);
		const board = await getCustomRepository(TaskboardRepository).findOne(
			board_id
		);

		const card = this.CardRepo.create({
			title: title,
			description: description,
			deadline: deadline,
			created_by: user,
			board: board,
			labels: labels
		});
		await this.CardRepo.save(card);
		return card!;
	}

	@Query((returns) => Card)
	async cardInfo(@Arg('card_id') cardId: number): Promise<Card> {
		const card = await this.CardRepo.findOne(cardId);
		return card!;
	}

	// The dealine gets stored in UTC format. So, adding 5:30 hrs to the deadline to fetch time in IST
	@FieldResolver()
	deadline(@Root() card: Card): string {
		return new Date(
			new Date(card.deadline).getTime() + 330 * 60000
		).toISOString();
	}

	@FieldResolver()
	completed_at(@Root() card: Card): string {
		if (card.completed_at !== undefined) {
			return new Date(
				new Date(card.completed_at).getTime() + 330 * 60000
			).toISOString();
		} else {
			return '';
		}
	}

	@FieldResolver((type) => [Users])
	async members(@Root() card: Card): Promise<Users[]> {
		return this.CardRepo.findMembersForCard(card.id);
	}

	@Mutation((type) => Card)
	async addMemberToCard(
		@Arg('card_id') cardId: number,
			@Arg('user_id') userId: number
	): Promise<Card> {
		const card = await this.CardRepo.findOne(cardId);
		await this.CardRepo.assignMemberToCard(userId, card!);
		return card!;
	}

	@Mutation((type) => Card)
	async chageCardStatusToOngoing(
		@Arg('card_id') cardId: number
	): Promise<Card> {
		const card = await this.CardRepo.findOne(cardId);
		await this.CardRepo.changeCardStatus(card!, CardStatus.ONGOING);
		return card!;
	}

	@Mutation((type) => Card)
	async chageCardStatusToCompleted(
		@Arg('card_id') cardId: number
	): Promise<Card> {
		const card = await this.CardRepo.findOne(cardId);
		if (card?.card_status === CardStatus.COMPLETED) {
			return card;
		} else {
			card!.completed_at = new Date();
			await this.CardRepo.changeCardStatus(card!, CardStatus.COMPLETED);
			return card!;
		}
	}

	@FieldResolver((type) => Users)
	async created_by(@Root() card: Card): Promise<Users> {
		const user = this.CardRepo.findCreatorOfCard(card.id);
		return user!;
	}
}
