import { Resolver, Mutation, Arg} from "type-graphql";
// import { addProject } from "./register/addProject"
import{ newProject} from "../database/entity/newProject"

@Resolver()
export class newProjectResolver{
    @Mutation(()=>newProject)
    async project(@Arg("project")projectName:string)
    :Promise<newProject>{
        const proj=await newProject.create({
            projectName
        }).save()
        return proj;
    }
} 