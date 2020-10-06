import {
	Arg,
	Args,
	Field,
	FieldResolver,
	InputType,
	Mutation,
	Query,
	Resolver,
	Root
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import { Project } from '../database/entity/Project';
import { Taskboard } from '../database/entity/Taskboard';
import { Users } from '../database/entity/User';
import { ProjectRepository } from '../repositories/Project';
import { TaskboardRepository } from '../repositories/Taskboard';
import { UserRepository } from '../repositories/User';

@InputType()
class ProjectInput {
	@Field()
	name!: string;

	@Field()
	description!: string;

	@Field()
	created_by_id!: number;
}

@Resolver(Project)
export class ProjectResolver {
	ProjectRepo = getCustomRepository(ProjectRepository);

	@Mutation(() => Project)
	async createProject(
		@Arg('project_data') { name, description, created_by_id }: ProjectInput
	): Promise<Project> {
		const user = await getCustomRepository(UserRepository).findOne(
			created_by_id
		);
		const project = await Project.create({
			name: name,
			description: description,
			created_by: user
		}).save();
		await this.ProjectRepo.addMemberToProject(
			created_by_id,
			project
		);
		return project;
	}

	@Query((type) => Project)
	async projectInfo(@Arg('project_id') projectId: number): Promise<Project> {
		const project = await this.ProjectRepo.findOne(projectId);
		return project!;
	}

	@FieldResolver((type) => [Taskboard])
	async boards(@Root() project: Project): Promise<Taskboard[]> {
		return this.ProjectRepo.findTaskBoardsForProject(project.id);
	}

	@FieldResolver((type) => [Users])
	async members(@Root() project: Project): Promise<Users[]> {
		const members = await this.ProjectRepo.findMembersForProject(project.id);
		return members;
	}

	@FieldResolver((type) => Users)
	async created_by(@Root() project: Project): Promise<Users> {
		const user = this.ProjectRepo.findCreatorOfProject(project.id);
		return user!;
	}

	@Mutation(() => Project)
	async addMemberToProject(
		@Arg('user_id') userId: number,
		@Arg('project_id') projectId: number
	): Promise<Project> {
		const project = await this.ProjectRepo.findOne(projectId);
		this.ProjectRepo.addMemberToProject(userId, project!);
		return project!;
	}
}
