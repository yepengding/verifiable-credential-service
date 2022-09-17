import 'reflect-metadata';

import {createExpressServer, useContainer as routingUseContainer} from 'routing-controllers';
import {Application} from "express";
import {useContainer as classValidatorUseContainer} from 'class-validator';
import {Container} from 'typedi';
import {env} from "./common/env";
import morgan from "morgan";
import {logger, stream} from "./logger";
import {ErrorHandler} from "./common/error-handling/ErrorHandler";
import {buildSchema} from "type-graphql";
import {ApolloServer} from "apollo-server-express";
import {UserResolver} from "./resolvers/UserResolver";
import {GraphQLError} from "graphql";

/**
 * App Entrance
 *
 * @author Yepeng Ding
 */
class App {
    private readonly app: Application

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.app = createExpressServer({
            cors: true,
            classTransformer: true,
            middlewares: [ErrorHandler],
            defaultErrorHandler: false
        });
        void this.initializeCore();
    }

    /**
     * Run application
     */
    public run() {
        this.app.listen(env.app.port, () => {
            logger.info(`🚀 App is running on port ${env.app.port}`);
        });
    }

    /**
     * Initialize core settings
     * @private
     */
    private async initializeCore() {
        // Initialize logging
        this.app.use(morgan(env.log.format, {stream}));

        // Set TypeDI container for routing-controllers and class-validator
        routingUseContainer(Container);
        classValidatorUseContainer(Container, {
            fallback: true,
            fallbackOnErrors: true
        });

        // Set and start Apollo server to enable GraphQL
        const schema = await buildSchema({
            container: Container,
            resolvers: [UserResolver],
        });

        const apolloServer = new ApolloServer({
            schema,
            csrfPrevention: true,
            debug: env.debug,
            cache: "bounded",
            formatError: (error: GraphQLError) => {
                if (env.debug) {
                    return error;
                }
                logger.error(error);
                return new Error(error.message);
            }
        });

        await apolloServer.start()
        apolloServer.applyMiddleware({app: this.app})
        logger.info(`🚀 Apollo is running at path ${apolloServer.graphqlPath}`);
    }

}

const app = new App();
app.run();
