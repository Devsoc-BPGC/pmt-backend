/**
 * Define & configure your status monitor
 *
 * @author DevSoc
 */

import { Application } from 'express';
import * as expressStatusMonitor from 'express-status-monitor';

class StatusMonitor {
	public express: Application;

	constructor(__express: Application) {
		this.express = __express;
	}

	public mount(): Application {

		// needs to consist of the prefix for all api calls
		const api: String = 'apiPrefix';

		// define status monitor config
		const monitorOptions: object = {
			title: 'Mello stats',
			path: '/mello-stats',
			theme: 'default.css',
			spans: [{
				interval: 1,
				retention: 60
			}, {
				interval: 5,
				retention: 60
			}, {
				interval: 10,
				retention: 60
			}],
			chartVisibility: {
				cpu: true,
				mem: true,
				load: true,
				eventLoop: true,
				heap: true,
				responseTime: true,
				rps: true,
				statusCodes: true
			},
			healthChecks: [{
				protocol: 'http',
				host: 'localhost',
				path: '/',
				port: '5000'
			}, {
				protocol: 'http',
				host: 'localhost',
				path: `/${api}`,
				port: '5000'
			}]
		};

		// Loads up the status monitor at /mello-stats endpoint
		this.express.use(expressStatusMonitor());

		return this.express;
	}
}

export default StatusMonitor;
