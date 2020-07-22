/**
 * Set up redis cache server
 *
 * @author Sarvesh Shinde <SarveshShinde64@gmail.com>
 */

import * as redis from 'redis';
import { error } from 'console';

class Cache {

	public redisClient: redis.RedisClient;

	constructor(options: Object) {
		this.redisClient = redis.createClient(options);
		this.redisClient = this.init();
	}

	/**
     * Initialises redis.
     */
	public init(): redis.RedisClient {
		this.redisClient.on('error', (err) => {
			console.log('Error:' + err);
		});
		this.redisClient.on('connect', () => {
			console.log('Redis client is connected to the server!');
		});
		this.redisClient.set('Hey', 'Im connected!');
		return this.redisClient;
	}

	public cache (): any {
		return (req: any, res: any, next: any) => {
			// Get id from body
			const { id } = req.body;

			// get data value for key =id
			this.redisClient.get(id, (err, data) => {
				if (err) {
					console.log(err);
					res.status(500).send(err);
				}
				// if no match found
				if (data != null) {
					// End cache connection and return response.
					this.endConn();
					res.send(data);
				} else {
					// proceed to next middleware function
					next();
				}
			});
		};
	}

	public endConn (): void {
		this.redisClient.quit(error => {
			console.log(`Couldn't quit Redis :(`);
		});
	}
}

export default new Cache({});
