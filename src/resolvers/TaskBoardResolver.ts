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
import { getCustomRepository } from 'typeorm';
import { Card } from '../database/entity/Card';
import { Taskboard } from '../database/entity/Taskboard';
import { Users } from '../database/entity/User';
import { ProjectRepository } from '../repositories/Project';
import { TaskboardRepository } from '../repositories/Taskboard';
import { UserRepository } from '../repositories/User';

@InputType()
class TaskBoardInput {
	@Field()
	name!: string;

	@Field()
	description!: string;

	@Field()
	github_repo_url!: string;

	@Field()
	project_id!: number;

	@Field()
	created_by_id!: number;
}

@Resolver(Taskboard)
export class TaskBoardResolver {
	TaskBoardRepo = getCustomRepository(TaskboardRepository);

	@Mutation((type) => Taskboard)
	async addBoard(
		@Arg('board_data')
			{
				name,
				description,
				github_repo_url,
				project_id,
				created_by_id
			}: TaskBoardInput
	): Promise<Taskboard> {
		const project = await getCustomRepository(ProjectRepository).findOne(
			project_id
		);

		const user = await getCustomRepository(UserRepository).findOne(
			created_by_id
		);
		const board = await this.TaskBoardRepo.create({
			name: name,
			description: description,
			github_repo_url: github_repo_url,
			project: project,
			created_by: user
		}).save();

		this.TaskBoardRepo.addMemberToTaskBoard(created_by_id, board);
		return board!;
	}

	@Query((returns) => Taskboard)
	async boardInfo(@Arg('board_id') boardId: number): Promise<Taskboard> {
		const board = await this.TaskBoardRepo.findOne(boardId);
		return board!;
	}

	@FieldResolver((type) => [Card])
	async cards(@Root() board: Taskboard): Promise<Card[]> {
		const cards = await this.TaskBoardRepo.findCardsForBoard(board.id);
		return cards;
	}

	@FieldResolver((type) => [Users])
	async members(@Root() board: Taskboard): Promise<Users[]> {
		const users = await this.TaskBoardRepo.findMembersOfBoard(board.id);
		return users;
	}

	@FieldResolver((type) => Users)
	async created_by(@Root() board: Taskboard): Promise<Users> {
		const user = this.TaskBoardRepo.findCreator(board.id);
		return user!;
	}

	@Mutation((type) => Taskboard)
	async addMemberToBoard(
		@Arg('user_id') userId: number,
			@Arg('board_id') boardId: number
	): Promise<Taskboard> {
		const board = await this.TaskBoardRepo.findOne(boardId);
		await this.TaskBoardRepo.addMemberToTaskBoard(userId, board!);
		return board!;
	}
}
