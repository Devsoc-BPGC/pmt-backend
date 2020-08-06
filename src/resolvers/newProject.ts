import { Resolver, Mutation, Arg} from 'type-graphql';
import {ProjectRepository } from '../repositories/Project'
import{ Project } from '../database/entity/Project';

@Resolver()
export class NewProjectResolver {
    @Mutation(() => Project)
    async project(@Arg('project'){name}:ProjectRepository)
    : Promise<Project> {
        const proj = await Project.create({
            name
        }).save();
        return proj;
    }
}
