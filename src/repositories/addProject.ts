import {Field,InputType} from "type-graphql";

@InputType()
export class addProject{
    @Field()
    projectName!: string;

}
