/**
 * Set up redis cache server
 *
 * @author Sarvesh Shinde <SarveshShinde64@gmail.com>
 */

import * as redis from 'redis';

class Cache {

	public redisClient: redis.RedisClient;

	constructor(options: Object) {
		this.redisClient = redis.createClient(options);
	}
	/**
     * Initialises redis.
     */
	public client(): redis.RedisClient {
		return this.redisClient;
	}

	public init(): void {
		this.redisClient.on('error', (err) => {
			console.log('Error:' + err);
		});
		this.redisClient.on('connect', () => {
			console.log('Redis client is connected to the server!');
		});
		this.redisClient.set('Hey', 'Im connected!');
	}
}

export default new Cache({});
