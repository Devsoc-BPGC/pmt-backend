import { Repository, EntityRepository, getCustomRepository, In } from 'typeorm';
import { Project } from '../database/entity/Project';
import { Users } from '../database/entity/User';
import { UserRepository } from './User';
import { Taskboard } from '../database/entity/Taskboard';
import {Field, InputType} from 'type-graphql';

@InputType()
@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {

	async findTaskBoardsForProject(id: number): Promise<Taskboard[]> {
		const project = await this.findOne(id, {
			relations: ['boards']
		});
		return project!.boards!;
	}

	async findMembersForProject(id: number): Promise<Users[]> {
		const project = await this.findOne(id, {
			relations: ['members']
		});
		return project!.members!;
	}

	async findCreatorOfProject(id: number): Promise<Users> {
		const project = await this.findOne(id, {
			relations: ['created_by']
		});
		return project!.created_by!;
	}

	async findAllDetails(id: number): Promise<Project> {
		const project = await this.findOne(id, {
			relations: ['created_by', 'members', 'boards']
		});
		return project!;
	}

	async addMemberToProject(user_id: number, project_id: number): Promise<void> {
		const userRepo = getCustomRepository(UserRepository);
		const user = await userRepo.findOne(user_id);
		if (user) {
			const project = await this.findOne(project_id);
			if (project) {
				project.members?.push(user);
			}
		}
	}

	findByName(name: string): Promise<Project|undefined> {
		return this.findOne({ name: name });
	}
	findByCreator(user: Users): Promise<Project[]> {
		return this.find({
			where: {
				created_by: user
			}
		});
	}

	@Field()
    name!: string;

}
