import { IsEmail } from 'class-validator';
import {
	Resolver,
	Query,
	Mutation,
	Arg,
	FieldResolver,
	Root,
	InputType,
	Field
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import { Card } from '../database/entity/Card';
import { Project } from '../database/entity/Project';
import { Taskboard } from '../database/entity/Taskboard';
import { UserRole, Users } from '../database/entity/User';
import { CardRepository } from '../repositories/Card';
import { ProjectRepository } from '../repositories/Project';
import { TaskboardRepository } from '../repositories/Taskboard';
import { UserRepository } from '../repositories/User';

@InputType()
class UserInput {
	@Field()
	name!: string;

	@Field()
	@IsEmail()
	email!: string;

	@Field()
	github_username!: string;

	@Field({ nullable: true })
	role?: UserRole;
}

@Resolver(Users)
export class UserResolver {
	UserRepo = getCustomRepository(UserRepository);

	@Mutation(() => Users)
	async SignUp(
		@Arg('user_data') { name, email, github_username }: UserInput
	): Promise<Users> {
		const newUser = Users.create({
			name: name,
			email: email,
			github_username: github_username
		});
		return this.UserRepo.addUser(newUser);
	}

	@Query((id) => Users)
	async UserInfo(@Arg('user_id') userId: number): Promise<Users> {
		const user = await this.UserRepo.findOne(userId);
		return user!;
	}

	@FieldResolver(type => [Project])
	async projects(@Root() user: Users): Promise<Project[]> {
		return this.UserRepo.findProjectsForUser(user.id);
	}

	@FieldResolver(type => [Card])
	async cards(@Root() user: Users): Promise<Card[]> {
		return this.UserRepo.findUserCards(user.id);
	}

	@FieldResolver(type => [Taskboard])
	async boards(@Root() user: Users): Promise<Taskboard[]> {
		return this.UserRepo.findBoardsForUser(user.id);
	}

	@FieldResolver(type => [Project])
	async projects_created(@Root() user: Users): Promise<Project[]>{
		return getCustomRepository(ProjectRepository).find({
			where: {
				created_by: user
			}
		});
	}

	@FieldResolver(type => [Taskboard])
	async boards_created(@Root() user: Users): Promise<Taskboard[]>{
		return getCustomRepository(TaskboardRepository).find({
			where: {
				created_by: user
			}
		});
	}

	@FieldResolver(type => [Card])
	async cards_created(@Root() user: Users): Promise<Card[]>{
		return getCustomRepository(CardRepository).find({
			where: {
				created_by: user
			}
		});
	}

	// Create a mutation for editing the user-details
}
