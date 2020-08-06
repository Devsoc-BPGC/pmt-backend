import { Resolver, Mutation, Arg} from 'type-graphql';
import { AddProject } from "../repositories/AddProject"
import{ NewProject } from '../database/entity/NewProject';

@Resolver()
export class NewProjectResolver {
    @Mutation(() => NewProject)
    async project(@Arg('project'){projectName}:AddProject)
    : Promise<NewProject> {
        const proj = await NewProject.create({
            projectName
        }).save();
        return proj;
    }
}
