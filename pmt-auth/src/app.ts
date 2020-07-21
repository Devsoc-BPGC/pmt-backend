/**
 * Bootstrap your app
 *
 * @author Sarvesh Shinde <SarveshShinde64@gmail.com>
 */

import * as os from 'os';
import * as cluster from 'cluster';

import app from './providers/App';

class App {

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
				app.loadServer();
				app.loadDatabase();

				console.log(`Worker ${process.pid} started`);
			}
		} else {
			app.loadServer();
			app.loadDatabase();
			app.loadCache();

			console.log(`Worker ${process.pid} started`);
		}
	}
}

const mode: any = process.env.CLUSTER || false;
new App().run(mode);
