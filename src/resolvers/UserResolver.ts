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
import { Project } from '../database/entity/Project';
import { UserRole, Users } from '../database/entity/User';
import { User } from '../interfaces/models/User';
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
	async signUp(
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
	async userInfo(@Arg('user_id') userId: number): Promise<Users> {
		const user = await this.UserRepo.findOne(userId);
		return user!;
	}

	@FieldResolver(type => [Project])
	async projects(@Root() user: User): Promise<Project[]> {
		return this.UserRepo.findProjectsForUser(user.id);
	}
}
