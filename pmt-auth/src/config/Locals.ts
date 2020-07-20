import { Application } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';

class Locals {
	public express: Application;
	constructor(__express: Application) {
		this.express = __express;
	}
	private config() {
		dotenv.config({ path: path.join(__dirname, '../../.env') });

		const port = process.env.PORT || '5000';
		const url = process.env.APP_URL || `http://localhost:${port}/`;
		const appSecret = process.env.APP_SECRET || 'App_Secret';
		const name = process.env.APP_NAME || 'Project Management Tool';
		const isCorsEnabled = process.env.IS_CORS_ENABLED === 'true';
		const orgName = process.env.ORG_NAME || 'Developers\' Society, BITS Goa';
		const isClusterMode = process.env.CLUSTER === 'true';

		return {
			app: {
				port: port,
				url: url,
				secretKey: appSecret,
				appName: name,
				isCorsEnabled: isCorsEnabled,
				organization: orgName,
				isClusterMode: isClusterMode
			}
		};
	}

	public init(): Application {
		this.express.locals.config = this.config();
		return this.express;
	}
}

export default Locals;
