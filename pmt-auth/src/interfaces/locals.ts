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
		},
		redis: {
			host: string
		},
		postgres: {
			type: string,
			host: string,
			port: string,
			username: string,
			password: string,
			database: string,
			entities: [
				string
			 ],
			 migrations: [
				string
			 ],
			 subscribers: [
				string
			 ],
			 cli: {
				'entitiesDir': string,
				'migrationsDir': string,
				'subscribersDir': string
			}
	}
	};
	docker: {
		redis: {
			host: string
		},
		postgres: {
				type: string,
                host: string,
                port: string,
                username: string,
                password: string,
                database: string,
                entities: [
                    string
                 ],
                 migrations: [
                    string
                 ],
                 subscribers: [
                    string
                 ],
                 cli: {
                    'entitiesDir': string,
                    'migrationsDir': string,
                    'subscribersDir': string
                }
		}
	};
	is_docker: boolean;
}
