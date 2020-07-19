/**
 * Setting up the express server here
 *
 * @author DevSoc
 */

import * as express from 'express';
import SecurityMiddleWare from './middlewares/SecurityMiddleWare'

class Express {
    /**
     * Create express app
     */

    public express: express.Application; // express.Application indicates the interface type of express app.

    constructor() {
        this.express = express();

        this.mountEnv();
        this.mountMiddleware(this.express);
        this.mountRoutes();
    }

    /**
     * mountEnv: For loading env
     */
    private mountEnv(): void {
        // Load the env file here.
    }

    /**
     * mountMiddleware: For adding middlewares
     */
    private mountMiddleware(express:express.Application): void {
        // Load your middlewares here
        SecurityMiddleWare.apply(express);
    }

    /**
     * mountRoutes: For adding routes
     */
    private mountRoutes(): void {
        // Load your routes here
    }

    /**
     * mountErrors: For handling errors/exceptions
     */
    public mountErrors() {
        // Load your error/exceptions here
    }

    /**
     * init
     */
    public init(PORT: string): void {
        const port = PORT;

        this.express.listen(port, (): void => {
            console.log(`The server is listening on PORT:${port}`);
        });
    }
}

export default new Express();
