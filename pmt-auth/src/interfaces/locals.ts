/**
 * Interface for env
 *
 * @author Sarvesh Shinde <SarveshShinde64@gmailc.com>
 */

export interface Env {
	app: {
		port: string,
		url: string,
		secretKey: string,
		appName: string,
		isCorsEnabled: boolean,
		organization: string,
		isClusterMode: boolean,
		github: {
			clientID: string,
			clientSecret: string,
			callbackURL: string
		}
	};
}
