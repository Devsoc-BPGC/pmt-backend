/**
 * Bootstrap your app
 *
 * @author DevSoc
 */

import * as os from 'os';
import * as cluster from 'cluster';
import * as http from 'http';

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
	http.createServer((req, res) => {
		res.writeHead(200);
		console.log('Hi! I am listening on 3000!');
		return;
	}).listen(3000);

	console.log(`Worker ${process.pid} started`);
}
