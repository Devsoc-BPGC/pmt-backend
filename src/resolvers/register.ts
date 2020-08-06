import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from 'type-graphql';

import { Users } from '../database/entity/User';
import { UserRepository } from '../repositories/User';
import {ProjectRepository } from '../repositories/Project';
import{ Project } from '../database/entity/Project';

@Resolver(Users)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }

  @FieldResolver()
  async name(@Root() parent: Users) {
    return `${parent.name} ${parent.email}`;
  }

  @Mutation(() => Users)
  async register(
    @Arg('name') name: string,
    @Arg('email') email: string
  ): Promise<Users> {
    // Accept all properties in practice and replace type 'any' with 'Users'
    const user: any = {
        name: name,
        email: email
    };
    // Assign 'new Class()' to a variable in practice.
    new UserRepository().addUser(user);

    return user;
  }
}
@Resolver()
export class NewProjectResolver {
    @Mutation(() => Project)
    async project(@Arg('project'){name}: ProjectRepository)
    : Promise<Project> {
        const proj = await Project.create({
            name
        }).save();
        return proj;
    }
}
