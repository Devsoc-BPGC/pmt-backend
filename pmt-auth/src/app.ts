/**
 * Bootstrap your app
 *
 * @author DevSoc
 */

import * as os from 'os';
import * as cluster from 'cluster';

import app from './Express';

class App {
	public PORT: string;

	constructor() {
		this.PORT = process.env.PORT || '5000';
	}

	public run(clusterMode: Boolean) {
		const mode: Boolean = clusterMode;
		console.log(mode);
		if (mode) {
			if (cluster.isMaster) {
				console.log(`Master ${process.pid} is running`);

				// Fork workers.
				for (let i = 0; i < os.cpus().length; i++) {
					cluster.fork();
				}

				cluster.on('exit', (worker, code, signal) => {
					console.log(`worker ${worker.process.pid} died`);
				});
			} else {
				/**
				 * Run the server on clusters.
				 */
				// App.loadServer();
				app.init(this.PORT);

				console.log(`Worker ${process.pid} started`);
			}
		} else {
			app.init(this.PORT);

			console.log(`Worker ${process.pid} started`);
		}
	}
}

const mode: any = process.env.CLUSTER || false;
new App().run(mode);
