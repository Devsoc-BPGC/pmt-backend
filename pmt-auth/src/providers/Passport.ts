
import * as passport from 'passport';
import { Strategy } from 'passport-github';
import Locals from '../config/Locals';

class Passport {
  	public init(): any {
  	const env: any = Locals.config();
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
			}
			)
		);
	}
}

export default new Passport;
