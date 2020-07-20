/**
 * Defining cahce middleware
 *
 * @author DevSoc
 */

import * as memoryCache from 'memory-cache';

class Cache {
	/**
	 * Checks for the available cached data
	 * or adds if not available
	 */
	public cache(duration: number): any {
		return (req: any, res: any, next: any) => {
			let key = '__express__' + req.originalUrl || req.url;

			let cachedBody = memoryCache.get(key);
			if (cachedBody) {
				res.send(cachedBody);
			} else {
				res.sendResponse = res.send;
				res.send = (body: any) => {
					memoryCache.put(key, body, duration * 1000);
					res.sendResponse(body);
				};
				next();
			}
		};
	}
}

export default new Cache;
