
import * as passport from 'passport';
import { Strategy } from 'passport-github';
import Locals from '../config/Locals';
import { Env } from '../interfaces/locals';

class Passport {
	public init(): any {
		const env: Env = Locals.config();
		console.log('Passport initialised!');
		return passport.use(
			new Strategy(
				{
					clientID: env.app.github.clientID,
					clientSecret: env.app.github.clientSecret,
					callbackURL: env.app.github.callbackURL
				},
				function (
					accessToken: string,
					refreshToken: string,
					profile: any,
					done: Function
				) {
					console.log('Auth successful');
					done(null, profile);
				}
			)
		);
	}
}

export default new Passport;
