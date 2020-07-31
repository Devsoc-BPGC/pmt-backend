import { Repository, EntityRepository } from 'typeorm';
import { Project } from '../entity/Project';
import { Users } from '../entity/User';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
	findByName(name: string) {
		return this.findOne({ name: name });
	}
	findByCreator(user: Users) {
		return this.find({
			where: {
				created_by: user
			}
		});
	}
}
