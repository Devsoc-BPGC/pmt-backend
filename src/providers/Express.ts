/**
 * Setting up the express server here
 *
 * @author DevSoc
 */

import * as express from 'express';

import Kernel from '../middleware/Kernel';
import ErrorHandler from '../api/middleware/errorhandler';
import Locals from '../config/Locals';

class Express {
	/**
     * Create express app
     */

	public express: express.Application; // express.Application indicates the interface type of express app.

	constructor() {
		this.express = express();
	}

	/**
     * mountEnv: For loading env
     */
	private mountEnv(): void {
		// Load the env file here.
		this.express = Locals.init(this.express);
	}

	/**
     * mountMiddleware: For adding middlewares
     */
	private mountMiddleware(): Promise<express.Application> {
		// Load your middlewares here
		return new Kernel(this.express).init();
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
	public async init(PORT: string): Promise<void> {
		const port = PORT;

		this.mountEnv();
		await this.mountMiddleware();
		this.mountErrors();

		this.express.listen(port, (): void => {
			console.log(`The server is listening on PORT:${port}`);
		});
	}
}

export default new Express;
