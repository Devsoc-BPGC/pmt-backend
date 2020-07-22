/**
 * Bootstrap your middlewares
 *
 * @author Sarvesh Shinde <SarveshShinde64@gmail.com>
 */

import Express from './Express';
import Database from './Database';
import Passport from './Passport';

export class App {
	/**
     * Initialize your app
     */
	public PORT: string;

	constructor() {
		this.PORT = process.env.PORT || '5000';
	}

	/**
     * Load the server
     */
	public loadServer() {
		Express.init(this.PORT);
	}

	/**
     * Load the database
     */
	public loadDatabase() {
		Database.init();
	}

	/**
	 * Initialise passport
	 */
	public loadPassport() {
		Passport.init();
	}
}

export default new App;
