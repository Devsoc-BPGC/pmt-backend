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
		@Arg('project_data') projectData: ProjectInput
	): Promise<Project> {
		const project = await Project.create(projectData).save();
		await this.ProjectRepo.addMemberToProject(
			projectData.created_by_id,
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

   @FieldResolver(type => [Users])
   async members(@Root() project: Project): Promise<Users[]> {
      const members = await this.ProjectRepo.findMembersForProject(project.id);
      return members;
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
