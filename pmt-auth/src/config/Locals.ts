import { Application } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Env } from  '../interfaces/locals';

class Locals {
	public config(): Env {
		dotenv.config({ path: path.join(__dirname, '../../.env') });

		const port = process.env.PORT || '5000';
		const url = process.env.APP_URL || `http://localhost:${port}/`;
		const appSecret = process.env.APP_SECRET || 'App_Secret';
		const name = process.env.APP_NAME || 'Project Management Tool';
		const isCorsEnabled = process.env.IS_CORS_ENABLED === 'true' || true;
		const orgName = process.env.ORG_NAME || 'Developers\' Society, BITS Goa';
		const isClusterMode = process.env.CLUSTER === 'true';
		const clientID = process.env.CLIENTID || '32c165309b81af8510b0';
		const clientSecret = process.env.CLIENTSECRET || 'c78b52ea8eb44fa3e5e35730d726fc132667538f';
		const callbackURL = url + process.env.CALLBACKPATH || '/auth/github/callback';
		console.log(port, url, appSecret, name, isCorsEnabled, orgName, isClusterMode, callbackURL);

		return {
			app: {
				port: port,
				url: url,
				secretKey: appSecret,
				appName: name,
				isCorsEnabled: isCorsEnabled,
				organization: orgName,
				isClusterMode: isClusterMode,
				github: {
					clientID: clientID,
					clientSecret: clientSecret,
					callbackURL: callbackURL
				}
			}
		};
	}

	public init(__express: Application): Application {
		__express.locals.config = this.config();
		return __express;
	}
}

export default new Locals;
