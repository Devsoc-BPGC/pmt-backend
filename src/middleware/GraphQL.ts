import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { Application } from 'express';
import { GraphQLSchema } from 'graphql';

import { RegisterResolver } from '../resolvers/register';
import { newProjectResolver } from '../resolvers/newProject';

export default class GraphQlServer {
    public express: Application;

	constructor(__express: Application) {
        this.express = __express;
	}

    public async mount(): Promise<Application> {
        const schema: GraphQLSchema = await buildSchema({
            resolvers: [RegisterResolver,newProjectResolver]
        });
        const server: ApolloServer = new ApolloServer({ schema });
        server.applyMiddleware({ app: this.express });
        return this.express;
    }
}
