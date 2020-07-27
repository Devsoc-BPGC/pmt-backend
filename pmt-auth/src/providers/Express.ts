/**
 * Setting up the express server here
 *
 * @author DevSoc
 */

import * as express from 'express';

import Kernel from '../middleware/Kernel';
import ErrorHandler from '../api/middleware/errorhandler';

class Express {
	/**
     * Create express app
     */

	public express: express.Application; // express.Application indicates the interface type of express app.

	constructor() {
		this.express = express();

		this.mountEnv();
		this.mountMiddleware();
		this.mountRoutes();
		this.mountErrors();
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
	private mountMiddleware(): void {
		// Load your middlewares here
		this.express = new Kernel(this.express).init();
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
	private mountErrors() {
		// Load your error/exceptions here
		this.express.use(ErrorHandler.handle);	 // Mounting Error-Handling middleware

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

export default new Express;
