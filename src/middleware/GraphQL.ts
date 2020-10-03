import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { Application } from 'express';
import { GraphQLSchema } from 'graphql';

import { UserResolver } from '../resolvers/UserResolver';
import { ProjectResolver } from '../resolvers/ProjectResolver';

export default class GraphQlServer {
    public express: Application;

	constructor(__express: Application) {
        this.express = __express;
	}

    public async mount(): Promise<Application> {
        const schema: GraphQLSchema = await buildSchema({
            resolvers: [UserResolver, ProjectResolver]
        });
        const server: ApolloServer = new ApolloServer({ schema });
        server.applyMiddleware({ app: this.express });
        return this.express;
    }
}
