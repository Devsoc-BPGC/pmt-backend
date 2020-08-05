import { Resolver, Mutation, Arg} from 'type-graphql';
// import { addProject } from "./register/addProject"
import{ NewProject} from '../database/entity/NewProject';

@Resolver()
export class NewProjectResolver {
    @Mutation(() => NewProject)
    async project(@Arg('project')projectName: string)
    : Promise<NewProject> {
        const proj = await NewProject.create({
            projectName
        }).save();
        return proj;
    }
}
