/**
 * Cache middleware for apis
 *
 * @author Sarvesh Shinde <SarveshShinde64@gmail.com>
 */

import Cache from '../../providers/RedisCache';
import { RedisClient } from 'redis';

class RedisCache {
	public static cache (): any {
		return (req: any, res: any, next: any) => {
			// Get id from body
			const { id } = req.body;

			const redis_client: RedisClient = Cache.client();
			// get data value for key =id
			redis_client.get(id, (err, data) => {
				if (err) {
					console.log(err);
					res.status(500).send(err);
				}
				// if no match found
				if (data != null) {
					res.send(data);
				} else {
					// proceed to next middleware function
					next();
				}
			});
		};
	}
}

export default new RedisCache;
